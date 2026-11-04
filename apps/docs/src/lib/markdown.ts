import { createMarkdownProcessor } from "@astrojs/markdown-remark";
import { rehypeCodeFrame } from "./rehype-code-frame";

type Processor = Awaited<ReturnType<typeof createMarkdownProcessor>>;
let processor: Promise<Processor> | undefined;

/** Render Markdown ke HTML saat build dengan tema Shiki yang sama seperti halaman docs. */
export async function renderMarkdown(markdown: string): Promise<string> {
  processor ??= createMarkdownProcessor({
    rehypePlugins: [rehypeCodeFrame],
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
      defaultColor: false,
    },
  });
  const { code } = await (await processor).render(markdown);
  return code;
}
