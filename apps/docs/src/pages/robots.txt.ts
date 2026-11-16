import type { APIRoute } from "astro";

/**
 * Semua crawler boleh masuk, termasuk crawler AI (GPTBot, ClaudeBot, PerplexityBot, Google-Extended):
 * MarkasUI open source dan llms.txt memang disediakan untuk agent. Demo template dan snippet hanya
 * bahan iframe, jadi tidak perlu diindeks.
 */
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /
Disallow: /demo/
Disallow: /snippets/

Sitemap: ${new URL("/sitemap.xml", site)}
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
