import type { APIRoute, GetStaticPaths } from "astro";
import { componentMarkdown } from "../../../lib/ai";
import { LOCALES, toLocale } from "../../../lib/i18n";
import { getComponents } from "../../../lib/registry";

export const getStaticPaths = (async () => {
  const items = await getComponents();
  return LOCALES.flatMap((locale) =>
    items.map((item) => ({
      params: { lang: locale === "en" ? undefined : locale, name: item.name },
      props: { item },
    })),
  );
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params, site }) =>
  new Response(
    componentMarkdown(props.item, site!.toString(), toLocale(params.lang)),
    {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    },
  );
