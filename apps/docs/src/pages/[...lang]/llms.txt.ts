import type { APIRoute } from "astro";
import { getDocs } from "../../lib/docs";
import { localeParams, localePath, t, toLocale } from "../../lib/i18n";
import { getComponents, groupByCategory, localized } from "../../lib/registry";
import { SITE } from "../../lib/site";

export const getStaticPaths = localeParams;

const INTRO = {
  en: "Every component ships in Blade (Alpine.js), React, and Vue with identical Tailwind CSS v4 classes. Colors come only from the tokens in markas.css.",
  id: "Setiap komponen tersedia dalam versi Blade (Alpine.js), React, dan Vue dengan class Tailwind CSS v4 yang identik. Warna hanya dari token markas.css.",
};

export const GET: APIRoute = async ({ site, params }) => {
  const locale = toLocale(params.lang);
  const strings = t(locale);
  const url = (path: string) =>
    new URL(localePath(locale, path), site).toString();
  const absolute = (path: string) => new URL(path, site).toString();
  const docs = await getDocs(locale);
  const groups = groupByCategory(await getComponents(), locale);

  const body = `# ${SITE.name}

> ${strings.meta.description} ${INTRO[locale]}

- Registry: ${absolute("/r/index.json")}, ${absolute("/r/{name}.json")}, ${absolute("/r/theme.json")}
- CLI: \`npx markasui@latest add <name>\`
- MCP: \`npx -y @markasui/mcp\`
- Full text: ${url("/llms-full.txt")}

## ${strings.nav.docs}

${docs.map(({ slug, entry }) => `- [${entry.data.title}](${url(`/docs/${slug}`)}): ${entry.data.description}`).join("\n")}

${groups
  .map(
    (group) => `## ${strings.nav.components}: ${group.label}

${group.items.map((item) => `- [${item.title}](${url(`/components/${item.name}.md`)}): ${localized(item, locale).description}`).join("\n")}`,
  )
  .join("\n\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
