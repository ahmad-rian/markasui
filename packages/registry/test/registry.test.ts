// @vitest-environment node
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  findColorViolations,
  loadComponent,
  loadComponents,
  parseMeta,
  parseTheme,
  toIndexItem,
} from "../src/lib.ts";

const root = resolve(import.meta.dirname, "../../..");

async function copyComponent(name: string) {
  const dir = await mkdtemp(join(tmpdir(), "markas-registry-"));
  const target = join(dir, name);
  await cp(join(root, "components", name), target, { recursive: true });
  return target;
}

async function editMeta(
  dir: string,
  edit: (meta: Record<string, unknown>) => Record<string, unknown>,
) {
  const path = join(dir, "meta.json");
  const meta = JSON.parse(await readFile(path, "utf8"));
  await writeFile(path, JSON.stringify(edit(meta)));
}

describe("registry", () => {
  it("memuat semua komponen dengan kode tiga framework dan target path", async () => {
    const items = await loadComponents(join(root, "components"));
    expect(items.map((item) => item.name)).toEqual(
      expect.arrayContaining(["button", "input", "modal", "tabs"]),
    );

    const button = items.find((item) => item.name === "button")!;
    expect(button.frameworks.blade.target).toBe(
      "resources/views/components/markas/button.blade.php",
    );
    expect(button.frameworks.react.target).toBe(
      "src/components/markas/Button.tsx",
    );
    expect(button.frameworks.vue.code).toContain("<script setup");
    expect(button.usage).toContain("## Blade");
  });

  it("index hanya berisi ringkasan", async () => {
    const [item] = await loadComponents(join(root, "components"));
    const index = toIndexItem(item!);
    expect(Object.keys(index).sort()).toEqual([
      "addedAt",
      "category",
      "description",
      "name",
      "status",
      "tags",
      "title",
    ]);
  });

  it("gagal kalau meta.json tidak sesuai skema", () => {
    expect(() => parseMeta({ name: "Button" }, "meta.json")).toThrow(
      /nama harus kebab-case/,
    );
  });

  it("gagal kalau dependensi runtime tidak diizinkan", async () => {
    const dir = await copyComponent("button");
    await editMeta(dir, (meta) => ({
      ...meta,
      frameworks: {
        ...(meta.frameworks as object),
        react: { file: "Button.tsx", deps: ["clsx"] },
      },
    }));
    await expect(loadComponent(dir)).rejects.toThrow(
      /react hanya boleh memakai dependensi/,
    );
  });

  it("gagal kalau file framework hilang", async () => {
    const dir = await copyComponent("button");
    await editMeta(dir, (meta) => ({
      ...meta,
      frameworks: {
        ...(meta.frameworks as object),
        vue: { file: "Tidakada.vue", deps: [] },
      },
    }));
    await expect(loadComponent(dir)).rejects.toThrow(
      /file vue tidak ditemukan/,
    );
  });

  it("gagal kalau nama folder beda dengan name", async () => {
    const dir = await copyComponent("button");
    await editMeta(dir, (meta) => ({ ...meta, name: "tombol" }));
    await expect(loadComponent(dir)).rejects.toThrow(
      /harus sama dengan nama folder/,
    );
  });

  it("gagal kalau meta.json bukan JSON", async () => {
    const dir = await copyComponent("button");
    await writeFile(join(dir, "meta.json"), "{");
    await expect(loadComponent(dir)).rejects.toThrow(/bukan JSON valid/);
  });

  it("gagal kalau komponen memakai warna di luar token", async () => {
    const dir = await copyComponent("button");
    const file = join(dir, "Button.tsx");
    await writeFile(
      file,
      (await readFile(file, "utf8")).replace("bg-primary", "bg-green-700"),
    );
    await expect(loadComponent(dir)).rejects.toThrow(/bg-green-700/);
  });

  it("memuat terjemahan Indonesia lengkap dengan usage.id.md", async () => {
    const modal = await loadComponent(join(root, "components", "modal"));
    expect(modal.description).toMatch(/^Modal dialog/);
    expect(modal.i18n.id.description).toMatch(/^Dialog modal/);
    expect(Object.keys(modal.i18n.id.props).sort()).toEqual(
      modal.props.map((prop) => prop.name).sort(),
    );
    expect(modal.i18n.id.usage).toContain("## Catatan");
  });

  it("gagal kalau terjemahan props tidak lengkap", async () => {
    const dir = await copyComponent("modal");
    await editMeta(dir, (meta) => {
      const i18n = meta.i18n as { id: { props: Record<string, string> } };
      const props = Object.fromEntries(
        Object.entries(i18n.id.props).filter(([name]) => name !== "closeLabel"),
      );
      return { ...meta, i18n: { id: { ...i18n.id, props } } };
    });
    await expect(loadComponent(dir)).rejects.toThrow(/kurang: closeLabel/);
  });

  it("gagal kalau jumlah catatan a11y terjemahan berbeda", async () => {
    const dir = await copyComponent("button");
    await editMeta(dir, (meta) => {
      const i18n = meta.i18n as { id: { a11y: string[] } };
      return {
        ...meta,
        i18n: { id: { ...i18n.id, a11y: i18n.id.a11y.slice(1) } },
      };
    });
    await expect(loadComponent(dir)).rejects.toThrow(/jumlah catatan a11y/);
  });

  it("gagal kalau usage.id.md tidak ada", async () => {
    const dir = await copyComponent("button");
    await rm(join(dir, "usage.id.md"));
    await expect(loadComponent(dir)).rejects.toThrow(
      /usage.id.md tidak ditemukan/,
    );
  });

  it("findColorViolations menangkap hex dan warna palet bawaan", () => {
    expect(findColorViolations('a\nclass="text-[#fff]"')).toEqual([
      'baris 2: "#fff"',
    ]);
    expect(findColorViolations("border-zinc-200")).toHaveLength(1);
    expect(
      findColorViolations("bg-primary text-on-primary border-line"),
    ).toEqual([]);
  });

  it("parseTheme membaca token light dan dark", async () => {
    const css = await readFile(join(root, "packages/theme/markas.css"), "utf8");
    const theme = parseTheme(css);
    expect(theme.tokens).toHaveLength(15);
    expect(theme.tokens.find((token) => token.name === "primary")).toEqual({
      name: "primary",
      light: "#2e6b3a",
      dark: "#5fa36b",
    });
  });

  it("parseTheme gagal kalau token dark hilang atau blok tidak ada", () => {
    expect(() =>
      parseTheme(":root {\n  --markas-ink: #000;\n}\n.dark {\n}"),
    ).toThrow(/tidak punya nilai di .dark/);
    expect(() => parseTheme("body {}")).toThrow(/tidak punya blok :root/);
  });

  it("menerima struktur folder baru", async () => {
    const dir = await mkdtemp(join(tmpdir(), "markas-empty-"));
    await mkdir(join(dir, "kosong"));
    await expect(loadComponents(dir)).rejects.toThrow(
      /meta.json tidak ditemukan/,
    );
  });
});
