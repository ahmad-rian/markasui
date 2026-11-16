import type { APIRoute } from "astro";
import { LOCALES, localePath } from "../lib/i18n";
import { indexableRoutes } from "../lib/routes";

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Satu <url> per halaman per bahasa, dengan alternatif hreflang (termasuk x-default) di setiap entri. */
export const GET: APIRoute = async ({ site }) => {
  const url = (path: string) => escape(new URL(path, site).toString());
  const routes = await indexableRoutes();
  const entries = routes.flatMap((route) => {
    const alternates = [
      ...LOCALES.map(
        (locale) =>
          `<xhtml:link rel="alternate" hreflang="${locale}" href="${url(localePath(locale, route.path))}"/>`,
      ),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${url(route.path)}"/>`,
    ].join("");
    return LOCALES.map(
      (locale) =>
        `<url><loc>${url(localePath(locale, route.path))}</loc>${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ""}${alternates}</url>`,
    );
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
