import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { DOCS_ROOT } from "./paths";
import { DOCS_NAV } from "./site";

export type DocPage = {
  href: string;
  title: string;
  description: string;
  body: string;
};

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;

/** Baca halaman docs Markdown apa adanya (tanpa frontmatter) untuk llms-full.txt. */
export async function getDocPages(): Promise<DocPage[]> {
  return Promise.all(
    DOCS_NAV.map(async ({ href }) => {
      const slug = href.split("/").at(-1);
      const path = resolve(DOCS_ROOT, `src/pages/docs/${slug}.md`);
      const source = await readFile(path, "utf8");
      const frontmatter = source.match(FRONTMATTER)?.[1] ?? "";
      const field = (name: string) =>
        frontmatter.match(new RegExp(`^${name}: (.*)$`, "m"))?.[1]?.trim() ??
        "";
      return {
        href,
        title: field("title"),
        description: field("description"),
        body: source.replace(FRONTMATTER, "").trim(),
      };
    }),
  );
}
