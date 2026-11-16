/**
 * Cek budget performa PRD bagian 10. Jalankan setelah pnpm build.
 * Pemakaian: node scripts/check-budget.ts
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import angular from "@analogjs/vite-plugin-angular";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { build, type PluginOption } from "vite";

const KB = 1024;
const BUDGET = {
  pageJs: 25 * KB,
  css: 30 * KB,
  fontFiles: 4,
  fontBytes: 120 * KB,
  componentJs: 3 * KB,
  /** Angular AOT: definisi komponen dan instruksi template ikut terhitung, runtime @angular tidak (sekitar 38 KB gzip, dimuat terpisah). */
  angularComponentJs: 4 * KB,
  /** Section halaman (faq, not-found, footer) memuat banyak tata letak dalam satu komponen: satu tingkat lebih longgar. */
  sectionExtra: 1 * KB,
  thumbnail: 30 * KB,
};

/**
 * Komponen navigasi halaman penuh dengan banyak mode (desktop, mobile, dropdown, rail), serta komponen dengan
 * banyak state per item (chat-message: aksi, salin, reaksi; file-dropzone: validasi, daftar, progres): ikut
 * kelonggaran section. Versi React dan Vue keduanya sudah di bawah 3 KB.
 */
const LARGE_COMPONENTS = new Set([
  "footer",
  "navbar",
  "sidebar",
  "navigation-menu",
  "chat-message",
  "file-dropzone",
]);

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "apps/docs/dist");
const gzip = (data: string | Buffer) => gzipSync(data, { level: 9 }).length;
const kb = (bytes: number) => `${(bytes / KB).toFixed(1)} KB`;

type Result = { label: string; value: string; limit: string; ok: boolean };
const results: Result[] = [];
const check = (label: string, actual: number, limit: number, format = kb) =>
  results.push({
    label,
    value: format(actual),
    limit: format(limit),
    ok: actual <= limit,
  });

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(join(dir, entry.name))
        : [join(dir, entry.name)],
    ),
  );
  return nested.flat();
}

const STATIC_IMPORT =
  /(?:^|[;\n}])\s*import\s*(?:[^"'()]*?\sfrom\s*)?["']([^"']+)["']|\bfrom\s*["'](\.{1,2}\/[^"']+)["']/g;

/** JS yang dimuat langsung oleh halaman: script module + import statis-nya. Island dan import() dinamis tidak dihitung. */
async function pageJsBytes(htmlPath: string): Promise<number> {
  const html = await readFile(htmlPath, "utf8");
  const queue = [
    ...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g),
  ].map((m) => join(dist, m[1]!));
  let total = [
    ...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g),
  ]
    // Data JSON (termasuk JSON-LD application/ld+json) bukan JavaScript yang dijalankan.
    .filter((m) => !/application\/(ld\+)?json/.test(m[0]))
    .reduce((sum, m) => sum + gzip(m[1]!), 0);

  const seen = new Set<string>();
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const code = await readFile(file, "utf8");
    total += gzip(code);
    for (const match of code.matchAll(STATIC_IMPORT)) {
      const spec = match[1] ?? match[2];
      if (spec?.startsWith(".")) queue.push(resolve(file, "..", spec));
    }
  }
  return total;
}

/** Framework yang diukur per komponen. Runtime framework sendiri tidak dihitung (external). */
const MEASURED = {
  react: {
    budget: BUDGET.componentJs,
    plugins: () => [react()],
    external: [/^react/],
  },
  vue: {
    budget: BUDGET.componentJs,
    plugins: () => [vue()],
    external: [/^vue$/],
  },
  svelte: {
    budget: BUDGET.componentJs,
    plugins: () => [svelte()],
    external: [/^svelte/],
  },
  angular: {
    budget: BUDGET.angularComponentJs,
    plugins: () =>
      angular({
        tsconfig: join(root, "tsconfig.angular.json"),
        workspaceRoot: root,
        transformFilter: (_code: string, id: string) =>
          id.endsWith(".component.ts"),
      }),
    external: [/^@angular\//, /^rxjs/, /^tslib$/],
  },
} satisfies Record<
  string,
  { budget: number; plugins: () => PluginOption; external: RegExp[] }
>;
type MeasuredFramework = keyof typeof MEASURED;

async function componentJsBytes(
  entry: string,
  framework: MeasuredFramework,
): Promise<number> {
  const { plugins, external } = MEASURED[framework];
  const output = await build({
    configFile: false,
    logLevel: "silent",
    publicDir: false,
    plugins: plugins(),
    build: {
      write: false,
      minify: true,
      lib: { entry, formats: ["es"], fileName: "c" },
      rollupOptions: { external },
    },
  });
  const bundles = Array.isArray(output) ? output : [output];
  return bundles
    .flatMap((bundle) => ("output" in bundle ? bundle.output : []))
    .reduce(
      (sum, chunk) => sum + (chunk.type === "chunk" ? gzip(chunk.code) : 0),
      0,
    );
}

async function main() {
  const files = await walk(dist).catch(() => {
    throw new Error(`${dist} tidak ada. Jalankan pnpm build dulu.`);
  });

  const pages = files.filter((file) => file.endsWith(".html"));
  const pageSizes = await Promise.all(
    pages.map(async (page) => [page, await pageJsBytes(page)] as const),
  );
  const [heaviestPage, heaviestJs] = pageSizes.toSorted(
    (a, b) => b[1] - a[1],
  )[0]!;
  check(
    `JS halaman (terberat: /${relative(dist, heaviestPage)})`,
    heaviestJs,
    BUDGET.pageJs,
  );

  // CSS yang dimuat satu halaman (stylesheet yang ditautkan + <style> inline), diambil halaman terberat.
  // Pagefind membuat CSS UI bawaannya, tapi situs memakai UI sendiri, jadi file itu tidak terhitung.
  const cssSize = new Map<string, number>();
  const pageCss = await Promise.all(
    pages.map(async (page) => {
      const html = await readFile(page, "utf8");
      let total = 0;
      for (const match of html.matchAll(
        /<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g,
      )) {
        const file = join(dist, match[1]!.replace(/^\//, ""));
        if (!cssSize.has(file)) cssSize.set(file, gzip(await readFile(file)));
        total += cssSize.get(file)!;
      }
      for (const match of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g))
        total += gzip(Buffer.from(match[1]!));
      return [page, total] as const;
    }),
  );
  const [heaviestCssPage, heaviestCss] = pageCss.toSorted(
    (a, b) => b[1] - a[1],
  )[0]!;
  check(
    `CSS halaman (terberat: /${relative(dist, heaviestCssPage)})`,
    heaviestCss,
    BUDGET.css,
  );

  const fonts = files.filter((f) => f.endsWith(".woff2"));
  const fontBytes = (
    await Promise.all(fonts.map(async (f) => (await stat(f)).size))
  ).reduce((a, b) => a + b, 0);
  check("Jumlah file font", fonts.length, BUDGET.fontFiles, String);
  check("Total font", fontBytes, BUDGET.fontBytes);

  for (const thumb of files.filter(
    (f) => f.includes("/thumbs/") && f.endsWith(".webp"),
  )) {
    check(
      `Thumbnail ${relative(dist, thumb)}`,
      (await stat(thumb)).size,
      BUDGET.thumbnail,
    );
  }

  const components = await readdir(join(root, "components"));
  for (const name of components) {
    const meta = JSON.parse(
      await readFile(join(root, "components", name, "meta.json"), "utf8"),
    );
    const isSection = meta.category === "section" || LARGE_COMPONENTS.has(name);
    for (const framework of Object.keys(MEASURED) as MeasuredFramework[]) {
      const file = meta.frameworks[framework]?.file;
      if (!file) continue;
      // React dan Vue tetap 3 KB untuk semua komponen; kelonggaran section hanya untuk framework baru.
      const extra =
        isSection && (framework === "svelte" || framework === "angular")
          ? BUDGET.sectionExtra
          : 0;
      check(
        `JS ${name} (${framework})`,
        await componentJsBytes(join(root, "components", name, file), framework),
        MEASURED[framework].budget + extra,
      );
    }
  }

  const width = Math.max(...results.map((r) => r.label.length));
  for (const r of results)
    console.log(
      `${r.ok ? "lolos" : "GAGAL"}  ${r.label.padEnd(width)}  ${r.value.padStart(9)} / ${r.limit}`,
    );

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`\nsize: ${failed.length} budget terlampaui`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`size: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
