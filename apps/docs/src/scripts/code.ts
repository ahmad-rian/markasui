import { copyText } from "./clipboard";
import { onPageLoad } from "./lifecycle";

// Salin dan "Lihat kode" untuk semua blok kode, baik dari CodeBlock.astro maupun dari Markdown.
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const block = target.closest<HTMLElement>("[data-code-block]");
  if (!block) return;
  if (target.closest("[data-expand]")) block.dataset.expanded = "";
  if (target.closest("[data-copy]"))
    void copyText(block.querySelector("pre")?.textContent ?? "", block);
});

// Plugin Markdown tidak tahu bahasa halaman, jadi label tombol salin di /id diterjemahkan di sini.
onPageLoad(() => {
  if (document.documentElement.lang !== "id") return;
  document
    .querySelectorAll<HTMLElement>("[data-copy][data-label-id]")
    .forEach((button) => {
      button.setAttribute("aria-label", button.dataset.labelId!);
    });
});
