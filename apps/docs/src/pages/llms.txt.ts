import type { APIRoute } from "astro";
import { getDocPages } from "../lib/docs";
import {
  CATEGORY_LABELS,
  getComponents,
  groupByCategory,
} from "../lib/registry";
import { SITE } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => new URL(path, site).toString();
  const docs = await getDocPages();
  const groups = groupByCategory(await getComponents());

  const body = `# ${SITE.name}

> ${SITE.description} Setiap komponen tersedia dalam versi Blade (Alpine.js), React, dan Vue dengan class Tailwind CSS v4 yang identik. Warna hanya dari token markas.css.

- Registry JSON: ${url("/r/index.json")} (daftar), ${url("/r/{nama}.json")} (kode tiga framework), ${url("/r/theme.json")} (token)
- CLI: \`npx markasui@latest add <nama>\`
- MCP: \`npx -y @markasui/mcp\`
- Isi lengkap: ${url("/llms-full.txt")}

## Docs

${docs.map((doc) => `- [${doc.title}](${url(doc.href)}): ${doc.description}`).join("\n")}

${groups
  .map(
    (group) => `## Komponen ${CATEGORY_LABELS[group.category]}

${group.items.map((item) => `- [${item.title}](${url(`/components/${item.name}.md`)}): ${item.description}`).join("\n")}`,
  )
  .join("\n\n")}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
