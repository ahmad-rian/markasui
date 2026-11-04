import type { APIRoute } from "astro";
import { componentMarkdown } from "../../lib/ai";
import { getDocs } from "../../lib/docs";
import { localeParams, t, toLocale } from "../../lib/i18n";
import { getComponents } from "../../lib/registry";
import { SITE } from "../../lib/site";

export const getStaticPaths = localeParams;

export const GET: APIRoute = async ({ site, params }) => {
  const locale = toLocale(params.lang);
  const docs = await getDocs(locale);
  const items = await getComponents();
  const sections = [
    `# ${SITE.name}\n\n${t(locale).meta.description}`,
    ...docs.map(
      ({ entry }) =>
        `# ${entry.data.title}\n\n${entry.data.description}\n\n${entry.body ?? ""}`,
    ),
    ...items.map((item) => componentMarkdown(item, site!.toString(), locale)),
  ];
  return new Response(`${sections.join("\n\n---\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
