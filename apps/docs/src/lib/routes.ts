/**
 * Semua halaman yang boleh diindeks (tanpa prefix locale), dipakai sitemap.xml.
 * /demo, /snippets, versi .md dan .txt, serta 404 sengaja tidak ada di sini.
 */
import { FRAMEWORKS } from "@markasui/registry/schema";
import { getDocs } from "./docs";
import { DEFAULT_LOCALE } from "./i18n";
import { getComponents } from "./registry";
import { gitModified } from "./seo-files";
import { DOC_SLUGS } from "./site";
import { KIND_BASE, getTemplates, templateDetailPath } from "./templates";

export type Route = { path: string; lastmod?: string };

/** Tanggal ISO terbaru (YYYY-MM-DD bisa dibandingkan sebagai string). */
const latest = (dates: (string | undefined)[]): string | undefined =>
  dates
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

export async function indexableRoutes(): Promise<Route[]> {
  const components = await getComponents();
  const componentDate = (item: (typeof components)[number]) =>
    item.updatedAt ?? item.addedAt;
  const allComponents = latest(components.map(componentDate));

  const templates = getTemplates().map((template) => ({
    template,
    lastmod: latest([
      template.addedAt,
      gitModified(`../../templates/${template.name}`),
    ]),
  }));
  const kindDate = (kind: "dashboard" | "page") =>
    latest(
      templates
        .filter(({ template }) => template.kind === kind)
        .map(({ lastmod }) => lastmod),
    );

  const docs = await getDocs(DEFAULT_LOCALE);
  const docDates = new Map(
    docs.map(({ slug, entry }) => [
      slug,
      latest([
        entry.filePath && gitModified(entry.filePath),
        gitModified(`src/content/docs/id/${slug}.md`),
      ]),
    ]),
  );

  return [
    {
      path: "/",
      lastmod: latest([
        allComponents,
        ...templates.map(({ lastmod }) => lastmod),
      ]),
    },
    { path: "/components", lastmod: allComponents },
    ...components.map((item) => ({
      path: `/components/${item.name}`,
      lastmod: componentDate(item),
    })),
    ...DOC_SLUGS.map((slug) => ({
      path: `/docs/${slug}`,
      lastmod: docDates.get(slug),
    })),
    { path: KIND_BASE.dashboard, lastmod: kindDate("dashboard") },
    { path: KIND_BASE.page, lastmod: kindDate("page") },
    ...templates.map(({ template, lastmod }) => ({
      path: templateDetailPath(template),
      lastmod,
    })),
    ...FRAMEWORKS.map((framework) => ({
      path: `/frameworks/${framework}`,
      lastmod: latest(
        components
          .filter((item) => item.frameworks[framework])
          .map(componentDate),
      ),
    })),
  ];
}
