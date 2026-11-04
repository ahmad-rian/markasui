import { getCollection, type CollectionEntry } from "astro:content";
import { DOC_SLUGS } from "./site";
import type { Locale } from "./i18n";

export type DocEntry = CollectionEntry<"docs">;

/** Halaman docs satu bahasa, urut sesuai menu. */
export async function getDocs(
  locale: Locale,
): Promise<{ slug: string; entry: DocEntry }[]> {
  const entries = await getCollection("docs", (entry) =>
    entry.id.startsWith(`${locale}/`),
  );
  return DOC_SLUGS.map((slug) => {
    const entry = entries.find((item) => item.id === `${locale}/${slug}`);
    if (!entry) throw new Error(`Docs ${locale}/${slug}.md tidak ada`);
    return { slug, entry };
  });
}
