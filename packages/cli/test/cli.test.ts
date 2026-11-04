// @vitest-environment node
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { loadComponent, parseTheme, toIndexItem } from "@markasui/registry";
import { beforeAll, describe, expect, it } from "vitest";
import { add, CliError, init, list } from "../src/commands.ts";
import type { Io } from "../src/io.ts";
import {
  defaultConfig,
  detectFramework,
  detectPackageManager,
} from "../src/project.ts";
import { createRegistry } from "../src/registry.ts";
import { setupGuide } from "../src/setup.ts";

const root = resolve(import.meta.dirname, "../../..");
const PILOT = ["button", "input", "modal", "tabs"];
let registry: string;

/** Registry lokal dari komponen pilot, seperti hasil pnpm registry. */
beforeAll(async () => {
  registry = await mkdtemp(join(tmpdir(), "markas-cli-registry-"));
  const items = await Promise.all(
    PILOT.map((name) => loadComponent(join(root, "components", name))),
  );
  const theme = parseTheme(
    await readFile(join(root, "packages/theme/markas.css"), "utf8"),
  );
  await writeFile(
    join(registry, "index.json"),
    JSON.stringify(items.map(toIndexItem)),
  );
  await writeFile(join(registry, "theme.json"), JSON.stringify(theme));
  for (const item of items)
    await writeFile(join(registry, `${item.name}.json`), JSON.stringify(item));
});

function fakeIo(answer: boolean | null = null) {
  const lines: string[] = [];
  const io: Io = {
    log: (message) => lines.push(message),
    warn: (message) => lines.push(message),
    confirm: async () => answer,
  };
  return { io, output: () => lines.join("\n") };
}

async function project(
  kind: "laravel" | "react" | "next" | "vue" | "nuxt" | "empty",
) {
  const dir = await mkdtemp(join(tmpdir(), `markas-cli-${kind}-`));
  const pkg = (deps: Record<string, string>) =>
    writeFile(
      join(dir, "package.json"),
      JSON.stringify({ dependencies: deps }),
    );
  if (kind === "laravel") {
    await writeFile(join(dir, "artisan"), "");
    await mkdir(join(dir, "resources/views"), { recursive: true });
    await pkg({});
  }
  if (kind === "react") await pkg({ react: "19" });
  if (kind === "next") await pkg({ next: "16", react: "19" });
  if (kind === "vue") await pkg({ vue: "3" });
  if (kind === "nuxt") await pkg({ nuxt: "4", vue: "3" });
  return dir;
}

describe("deteksi project", () => {
  it.each([
    ["laravel", "blade", "resources/views/components/markas"],
    ["react", "react", "src/components/markas"],
    ["next", "react", "components/markas"],
    ["vue", "vue", "src/components/markas"],
    ["nuxt", "vue", "components/markas"],
  ] as const)(
    "%s terdeteksi sebagai %s",
    async (kind, framework, componentsDir) => {
      const dir = await project(kind);
      const detection = await detectFramework(dir);
      expect(detection?.framework).toBe(framework);
      expect((await defaultConfig(dir, detection!)).componentsDir).toBe(
        componentsDir,
      );
    },
  );

  it("folder kosong tidak terdeteksi", async () => {
    expect(await detectFramework(await project("empty"))).toBeNull();
  });

  it("package manager dari lockfile", async () => {
    const dir = await project("react");
    expect(await detectPackageManager(dir)).toBe("npm");
    await writeFile(join(dir, "bun.lock"), "");
    expect(await detectPackageManager(dir)).toBe("bun");
  });
});

describe("init", () => {
  it("membuat markas.json dan menyalin markas.css", async () => {
    const dir = await project("laravel");
    const { io, output } = fakeIo();
    await init({ cwd: dir, registry }, io);

    const config = JSON.parse(await readFile(join(dir, "markas.json"), "utf8"));
    expect(config).toEqual({
      framework: "blade",
      componentsDir: "resources/views/components/markas",
      cssPath: "resources/css/markas.css",
    });
    expect(
      await readFile(join(dir, "resources/css/markas.css"), "utf8"),
    ).toContain("--markas-primary");
    expect(output()).toContain("MarkasUI setup for Laravel");
  });

  it("--framework mengalahkan deteksi", async () => {
    const dir = await project("empty");
    await init({ cwd: dir, registry, framework: "vue" }, fakeIo().io);
    expect(
      JSON.parse(await readFile(join(dir, "markas.json"), "utf8")).framework,
    ).toBe("vue");
  });

  it("menolak framework tidak dikenal", async () => {
    await expect(
      init(
        { cwd: await project("empty"), registry, framework: "svelte" },
        fakeIo().io,
      ),
    ).rejects.toThrow(CliError);
  });
});

describe("add", () => {
  it("menulis file sesuai framework dan menampilkan dependensi", async () => {
    const dir = await project("laravel");
    await writeFile(join(dir, "pnpm-lock.yaml"), "");
    const { io, output } = fakeIo();
    await add(["button", "modal"], { cwd: dir, registry }, io);

    expect(
      await readFile(
        join(dir, "resources/views/components/markas/modal.blade.php"),
        "utf8",
      ),
    ).toContain("<dialog");
    expect(output()).toContain("pnpm add alpinejs");
  });

  it("tidak menimpa file berbeda kecuali dikonfirmasi atau --overwrite", async () => {
    const dir = await project("react");
    const file = join(dir, "src/components/markas/Button.tsx");
    await add(["button"], { cwd: dir, registry }, fakeIo().io);
    await writeFile(file, "// versi saya");

    const skipped = fakeIo(null);
    await add(["button"], { cwd: dir, registry }, skipped.io);
    expect(await readFile(file, "utf8")).toBe("// versi saya");
    expect(skipped.output()).toContain("--overwrite");

    await add(["button"], { cwd: dir, registry }, fakeIo(false).io);
    expect(await readFile(file, "utf8")).toBe("// versi saya");

    await add(["button"], { cwd: dir, registry }, fakeIo(true).io);
    expect(await readFile(file, "utf8")).toContain("export function Button");

    await writeFile(file, "// lagi");
    await add(
      ["button"],
      { cwd: dir, registry, overwrite: true },
      fakeIo(false).io,
    );
    expect(await readFile(file, "utf8")).toContain("export function Button");
  });

  it("memakai markas.json yang sudah ada", async () => {
    const dir = await project("react");
    await writeFile(
      join(dir, "markas.json"),
      JSON.stringify({
        framework: "react",
        componentsDir: "ui",
        cssPath: "ui/markas.css",
      }),
    );
    await add(["tabs"], { cwd: dir, registry }, fakeIo().io);
    expect(await readFile(join(dir, "ui/Tabs.tsx"), "utf8")).toContain(
      'role="tablist"',
    );
  });

  it("menolak nama tidak valid, komponen tidak ada, dan daftar kosong", async () => {
    const dir = await project("vue");
    await expect(
      add(["../etc"], { cwd: dir, registry }, fakeIo().io),
    ).rejects.toThrow(/Invalid component name/);
    await expect(
      add(["tidakada"], { cwd: dir, registry }, fakeIo().io),
    ).rejects.toThrow(/Not found/);
    await expect(add([], { cwd: dir, registry }, fakeIo().io)).rejects.toThrow(
      CliError,
    );
  });

  it("menolak nama file berbahaya dari registry", async () => {
    const evil = await mkdtemp(join(tmpdir(), "markas-evil-"));
    const item = JSON.parse(
      await readFile(join(registry, "button.json"), "utf8"),
    );
    item.frameworks.vue.file = "../../evil.vue";
    await writeFile(join(evil, "button.json"), JSON.stringify(item));
    await expect(
      add(
        ["button"],
        { cwd: await project("vue"), registry: evil },
        fakeIo().io,
      ),
    ).rejects.toThrow(/Unsafe file name/);
  });
});

describe("list dan registry", () => {
  it("list mengelompokkan per kategori", async () => {
    const { io, output } = fakeIo();
    await list({ cwd: await project("empty"), registry }, io);
    expect(output()).toMatch(/FORM\n\s+button/);
  });

  it("registry file:// dan cache", async () => {
    const client = createRegistry(`file://${registry}`);
    const first = await client.index();
    expect(await client.index()).toBe(first);
  });

  it("setup guide untuk setiap framework", () => {
    expect(setupGuide("blade")).toContain("@source");
    expect(setupGuide("react", "app/markas.css")).toContain("app/markas.css");
    expect(setupGuide("vue")).toContain("vite.config.ts");
  });
});
