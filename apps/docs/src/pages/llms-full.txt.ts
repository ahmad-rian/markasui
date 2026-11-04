import type { APIRoute } from "astro";
import { componentMarkdown } from "../lib/ai";
import { getDocPages } from "../lib/docs";
import { getComponents } from "../lib/registry";
import { SITE } from "../lib/site";

export const GET: APIRoute = async ({ site }) => {
  const docs = await getDocPages();
  const items = await getComponents();
  const sections = [
    `# ${SITE.name}\n\n${SITE.description}`,
    ...docs.map((doc) => `# ${doc.title}\n\n${doc.description}\n\n${doc.body}`),
    ...items.map((item) => componentMarkdown(item, site!.toString())),
  ];
  return new Response(`${sections.join("\n\n---\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
