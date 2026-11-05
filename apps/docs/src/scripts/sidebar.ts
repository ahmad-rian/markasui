import { onPageLoad } from "./lifecycle";

/** Sidebar docs ikut diganti saat navigasi SPA. Posisi gulirnya disimpan supaya tidak lompat ke atas. */
const sidebar = () =>
  document.querySelector<HTMLElement>("[data-docs-sidebar]");
let savedScroll: number | undefined;

document.addEventListener("astro:before-swap", () => {
  savedScroll = sidebar()?.scrollTop;
});

document.addEventListener("astro:after-swap", () => {
  const element = sidebar();
  if (element && savedScroll !== undefined) element.scrollTop = savedScroll;
});

// Kunjungan pertama atau setelah reload: pastikan link aktif terlihat.
onPageLoad(() => {
  if (savedScroll !== undefined) return;
  const element = sidebar();
  const active = element?.querySelector<HTMLElement>("[aria-current=page]");
  if (!element || !active) return;
  const box = element.getBoundingClientRect();
  const link = active.getBoundingClientRect();
  if (link.top < box.top || link.bottom > box.bottom)
    element.scrollTop += link.top - box.top - box.height / 2;
});
