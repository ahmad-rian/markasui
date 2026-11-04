import type { APIRoute, GetStaticPaths } from "astro";
import { getDocs } from "../../../lib/docs";
import { LOCALES } from "../../../lib/i18n";

export const getStaticPaths = (async () => {
  const pages = await Promise.all(
    LOCALES.map(async (locale) =>
      (await getDocs(locale)).map(({ slug, entry }) => ({
        params: { lang: locale === "en" ? undefined : locale, slug },
        props: {
          markdown: `# ${entry.data.title}\n\n${entry.data.description}\n\n${entry.body ?? ""}`,
        },
      })),
    ),
  );
  return pages.flat();
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(props.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
