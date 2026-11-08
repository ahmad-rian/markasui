/**
 * Cek budget performa PRD bagian 10. Jalankan setelah pnpm build.
 * Pemakaian: node scripts/check-budget.ts
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { build } from "vite";

const KB = 1024;
const BUDGET = {
  pageJs: 25 * KB,
  css: 30 * KB,
  fontFiles: 4,
  fontBytes: 120 * KB,
  componentJs: 3 * KB,
  thumbnail: 30 * KB,
};

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
    .filter((m) => !m[0].includes("application/json"))
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

async function componentJsBytes(entry: string): Promise<number> {
  const output = await build({
    configFile: false,
    logLevel: "silent",
    plugins: [react(), vue()],
    build: {
      write: false,
      minify: true,
      lib: { entry, formats: ["es"], fileName: "c" },
      rollupOptions: { external: [/^react/, /^vue$/] },
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
    for (const framework of ["react", "vue"] as const) {
      const entry = join(
        root,
        "components",
        name,
        meta.frameworks[framework].file,
      );
      check(
        `JS ${name} (${framework})`,
        await componentJsBytes(entry),
        BUDGET.componentJs,
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
