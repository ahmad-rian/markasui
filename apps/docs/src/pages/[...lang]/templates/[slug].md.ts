import type { APIRoute, GetStaticPaths } from "astro";
import { toLocale } from "../../../lib/i18n";
import {
  templateMarkdown,
  templateMarkdownPaths,
} from "../../../lib/template-ai";

/** Versi Markdown detail dashboard (CopyPage, llms.txt). Page punya versinya sendiri di /pages/<slug>.md. */
export const getStaticPaths = (() =>
  templateMarkdownPaths("dashboard")) satisfies GetStaticPaths;

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
