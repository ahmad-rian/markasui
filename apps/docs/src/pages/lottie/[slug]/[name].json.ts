import type { APIRoute } from "astro";

/** Animasi Lottie template (templates/<slug>/lottie/*.json) untuk versi Blade, yang memuatnya lewat fetch. */
const files = import.meta.glob<string>(
  "../../../../../../templates/*/lottie/*.json",
  { query: "?raw", import: "default", eager: true },
);

export function getStaticPaths() {
  return Object.entries(files).map(([path, body]) => {
    const [, slug, name] = /templates\/([^/]+)\/lottie\/([^/]+)\.json$/.exec(
      path,
    )!;
    return { params: { slug, name }, props: { body } };
  });
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.body as string, {
    headers: { "Content-Type": "application/json" },
  });
