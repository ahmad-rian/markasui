import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { exampleForDisplay } from "./frameworks";
import {
  REQUIRED_TEMPLATE_FRAMEWORKS,
  TEMPLATE_FRAMEWORKS,
  templateFilePath,
  type TemplateFramework,
} from "./template-frameworks";
import type { Locale } from "./i18n";
import { REPO_ROOT } from "./paths";

/** dashboard: aplikasi multi-halaman (menu Templates). page: welcome/landing page siap pakai (menu Pages). */
export type TemplateKind = "dashboard" | "page";

export type TemplateMeta = {
  name: string;
  kind: TemplateKind;
  title: string;
  description: Record<Locale, string>;
  components: string[];
  addedAt: string;
};

export type TemplateSource = { path: string; code: string };

export type Template = TemplateMeta & {
  /** Framework yang punya versi template ini, urut seperti TEMPLATE_FRAMEWORKS. */
  frameworks: TemplateFramework[];
  sources: Partial<Record<TemplateFramework, TemplateSource>>;
};

export { TEMPLATE_FRAMEWORKS };

const templatesDir = resolve(REPO_ROOT, "templates");

/**
 * Template yang lengkap (meta.json + versi Blade, React, Vue). Template setengah jadi dilewati.
 * Versi Svelte, Astro, dan Angular ikut terdeteksi kalau file-nya ada.
 */
export function getTemplates(): Template[] {
  if (!existsSync(templatesDir)) return [];
  return readdirSync(templatesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const dir = join(templatesDir, entry.name);
      const metaPath = join(dir, "meta.json");
      const exists = (fw: TemplateFramework) =>
        existsSync(join(dir, templateFilePath(fw, entry.name)));
      if (!existsSync(metaPath) || !REQUIRED_TEMPLATE_FRAMEWORKS.every(exists))
        return [];
      const raw = JSON.parse(readFileSync(metaPath, "utf8")) as Omit<
        TemplateMeta,
        "kind"
      > & { kind?: unknown };
      const meta: TemplateMeta = {
        ...raw,
        kind: raw.kind === "page" ? "page" : "dashboard",
      };
      const frameworks = TEMPLATE_FRAMEWORKS.filter(exists);
      const sources = Object.fromEntries(
        frameworks.map((fw) => {
          const path = templateFilePath(fw, entry.name);
          const code = readFileSync(join(dir, path), "utf8");
          return [fw, { path, code: `${exampleForDisplay(code, fw)}\n` }];
        }),
      );
      return [{ ...meta, frameworks, sources }];
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Template berdasarkan jenis: "dashboard" untuk /templates, "page" untuk /pages. */
export const getTemplatesByKind = (kind: TemplateKind): Template[] =>
  getTemplates().filter((template) => template.kind === kind);

/** Bagian path daftar per jenis, tanpa prefix locale. */
export const KIND_BASE: Record<TemplateKind, "/templates" | "/pages"> = {
  dashboard: "/templates",
  page: "/pages",
};

/** Path detail kanonik (tanpa prefix locale): /pages/<slug> untuk page, /templates/<slug> untuk dashboard. */
export const templateDetailPath = (
  template: Pick<TemplateMeta, "name" | "kind">,
) => `${KIND_BASE[template.kind]}/${template.name}`;
