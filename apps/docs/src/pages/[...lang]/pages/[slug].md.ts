import type { APIRoute, GetStaticPaths } from "astro";
import { toLocale } from "../../../lib/i18n";
import {
  templateMarkdown,
  templateMarkdownPaths,
} from "../../../lib/template-ai";

/** Versi Markdown detail welcome page (CopyPage, llms.txt). */
export const getStaticPaths = (() =>
  templateMarkdownPaths("page")) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, params, site }) =>
  new Response(
    templateMarkdown(
      props.template,
      props.registry,
      site!.toString(),
      toLocale(params.lang),
    ),
    { headers: { "Content-Type": "text/markdown; charset=utf-8" } },
  );
