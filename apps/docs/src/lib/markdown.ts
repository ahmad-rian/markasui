import { createMarkdownProcessor } from "@astrojs/markdown-remark";

type Processor = Awaited<ReturnType<typeof createMarkdownProcessor>>;
let processor: Promise<Processor> | undefined;

/** Render Markdown ke HTML saat build dengan tema Shiki yang sama seperti halaman docs. */
export async function renderMarkdown(markdown: string): Promise<string> {
  processor ??= createMarkdownProcessor({
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  });
  const { code } = await (await processor).render(markdown);
  return code;
}
