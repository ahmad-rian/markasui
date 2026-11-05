import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Framework } from "@markasui/registry/schema";
import type { Locale } from "./i18n";
import { REPO_ROOT } from "./paths";

export type TemplateMeta = {
  name: string;
  title: string;
  description: Record<Locale, string>;
  components: string[];
  addedAt: string;
};

export type Template = TemplateMeta & {
  sources: Record<Framework, { path: string; code: string }>;
};

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
      const files: Record<Framework, string> = {
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
      const meta = JSON.parse(readFileSync(metaPath, "utf8")) as TemplateMeta;
      const sources = Object.fromEntries(
        (Object.entries(files) as [Framework, string][]).map(([fw, file]) => [
          fw,
          {
            path: file,
            code: readFileSync(join(dir, file), "utf8").replace(
              /(["'])(?:\.\.\/)+components\/[a-z-]+\/([A-Za-z]+(?:\.vue)?)\1/g,
              "$1@/components/markas/$2$1",
            ),
          },
        ]),
      ) as Template["sources"];
      return [{ ...meta, sources }];
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
