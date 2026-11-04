import type { APIRoute, GetStaticPaths } from "astro";
import { componentMarkdown } from "../../lib/ai";
import { getComponents } from "../../lib/registry";

export const getStaticPaths = (async () =>
  (await getComponents()).map((item) => ({
    params: { name: item.name },
    props: { item },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) =>
  new Response(componentMarkdown(props.item, site!.toString()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
