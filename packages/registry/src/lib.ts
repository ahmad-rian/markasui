import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  availableFrameworks,
  metaSchema,
  type ComponentMeta,
  type Framework,
  type RegistryIndexItem,
  type RegistryItem,
  type RegistryTheme,
  type ThemeToken,
} from "./schema.ts";

/** Folder tujuan default di project user (PRD bagian 9). */
export const TARGET_DIRS: Record<Framework, string> = {
  blade: "resources/views/components/markas",
  react: "src/components/markas",
  vue: "src/components/markas",
  svelte: "src/lib/components/markas",
  astro: "src/components/markas",
  angular: "src/app/markas",
};

export { availableFrameworks };

export class RegistryError extends Error {
  override name = "RegistryError";
}

const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/;
const PALETTE_COLOR =
  /\b(?:bg|text|border|ring|outline|fill|stroke|from|via|to|shadow|decoration|accent|caret|divide|placeholder)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-\d{2,3})?(?:\/\d{1,3})?\b/;

/** Komponen hanya boleh memakai token warna markas.css (PRD bagian 6). */
export function findColorViolations(code: string): string[] {
  return code.split("\n").flatMap((line, index) => {
    const match = line.match(HEX_COLOR) ?? line.match(PALETTE_COLOR);
    return match ? [`baris ${index + 1}: "${match[0]}"`] : [];
  });
}

export function parseMeta(raw: unknown, source: string): ComponentMeta {
  const result = metaSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues.map(
      (issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`,
    );
    throw new RegistryError(`${source} tidak valid:\n${issues.join("\n")}`);
  }
  return result.data;
}

async function readText(path: string, what: string): Promise<string> {
  try {
    return await readFile(path, "utf8");
  } catch {
    throw new RegistryError(`${what} tidak ditemukan: ${path}`);
  }
}

export async function loadComponent(
  componentDir: string,
): Promise<RegistryItem> {
  const metaPath = join(componentDir, "meta.json");
  const metaText = await readText(metaPath, "meta.json");
  let raw: unknown;
  try {
    raw = JSON.parse(metaText);
  } catch (error) {
    throw new RegistryError(
      `${metaPath} bukan JSON valid: ${(error as Error).message}`,
    );
  }
  const meta = parseMeta(raw, metaPath);

  const folderName = componentDir.split(/[\\/]/).at(-1);
  if (folderName !== meta.name) {
    throw new RegistryError(
      `${metaPath}: name "${meta.name}" harus sama dengan nama folder "${folderName}"`,
    );
  }

  const entries = await Promise.all(
    availableFrameworks(meta).map(async (framework) => {
      const spec = meta.frameworks[framework]!;
      const path = join(componentDir, spec.file);
      const code = await readText(path, `file ${framework}`);
      const violations = findColorViolations(code);
      if (violations.length > 0) {
        throw new RegistryError(
          `${path} memakai warna di luar token markas.css:\n  ${violations.join("\n  ")}`,
        );
      }
      return [
        framework,
        { ...spec, target: `${TARGET_DIRS[framework]}/${spec.file}`, code },
      ] as const;
    }),
  );

  const usage = await readText(join(componentDir, "usage.md"), "usage.md");
  const usageId = await readText(
    join(componentDir, "usage.id.md"),
    "usage.id.md",
  );
  return {
    ...meta,
    frameworks: Object.fromEntries(entries) as RegistryItem["frameworks"],
    usage,
    i18n: { id: { ...meta.i18n.id, usage: usageId } },
  };
}

export async function loadComponents(
  componentsDir: string,
): Promise<RegistryItem[]> {
  const entries = await readdir(componentsDir, { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(componentsDir, entry.name));
  const items = await Promise.all(dirs.map(loadComponent));
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function toIndexItem(item: RegistryItem): RegistryIndexItem {
  const {
    name,
    title,
    description,
    category,
    tags,
    status,
    addedAt,
    updatedAt,
  } = item;
  return {
    name,
    frameworks: availableFrameworks(item),
    title,
    description,
    category,
    tags,
    status,
    addedAt,
    ...(updatedAt ? { updatedAt } : {}),
  };
}

const TOKEN_LINE = /--markas-([a-z-]+):\s*([^;]+);/g;

function readBlock(css: string, selector: string): Map<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1)
    throw new RegistryError(`markas.css tidak punya blok ${selector}`);
  const block = css.slice(start, css.indexOf("}", start));
  return new Map(
    [...block.matchAll(TOKEN_LINE)].map((match) => [
      match[1]!,
      match[2]!.trim(),
    ]),
  );
}

export function parseTheme(css: string): RegistryTheme {
  const light = readBlock(css, ":root");
  const dark = readBlock(css, ".dark");
  const tokens: ThemeToken[] = [...light].map(([name, value]) => {
    const darkValue = dark.get(name);
    if (darkValue === undefined)
      throw new RegistryError(
        `token --markas-${name} tidak punya nilai di .dark`,
      );
    return { name, light: value, dark: darkValue };
  });
  return { css, tokens };
}
