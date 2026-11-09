import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  TEMPLATE_FRAMEWORKS,
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

export type Template = TemplateMeta & {
  sources: Record<TemplateFramework, { path: string; code: string }>;
};

export { TEMPLATE_FRAMEWORKS };

const templatesDir = resolve(REPO_ROOT, "templates");
const pascal = (slug: string) =>
  slug.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase());

/** Template yang lengkap (meta.json + tiga versi). Template setengah jadi dilewati. */
export function getTemplates(): Template[] {
  if (!existsSync(templatesDir)) return [];
  return readdirSync(templatesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const dir = join(templatesDir, entry.name);
      const files: Record<TemplateFramework, string> = {
        blade: `blade/${entry.name}.blade.php`,
        react: `react/${pascal(entry.name)}.tsx`,
        vue: `vue/${pascal(entry.name)}.vue`,
      };
      const metaPath = join(dir, "meta.json");
      if (
        !existsSync(metaPath) ||
        Object.values(files).some((file) => !existsSync(join(dir, file)))
      )
        return [];
      const raw = JSON.parse(readFileSync(metaPath, "utf8")) as Omit<
        TemplateMeta,
        "kind"
      > & { kind?: unknown };
      const meta: TemplateMeta = {
        ...raw,
        kind: raw.kind === "page" ? "page" : "dashboard",
      };
      const sources = Object.fromEntries(
        (Object.entries(files) as [TemplateFramework, string][]).map(
          ([fw, file]) => [
            fw,
            {
              path: file,
              code: readFileSync(join(dir, file), "utf8").replace(
                /(["'])(?:\.\.\/)+components\/[a-z-]+\/([A-Za-z]+(?:\.vue)?)\1/g,
                "$1@/components/markas/$2$1",
              ),
            },
          ],
        ),
      ) as Template["sources"];
      return [{ ...meta, sources }];
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
