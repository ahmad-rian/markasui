import type { Framework } from "@markasui/registry/frameworks";

/** Lama kartu tampil, sama dengan durasi animasi fw-splash dan fw-pulse di FrameworkSplash.astro. */
const VISIBLE_MS = 900;
/** Jeda singkat setelah region dikosongkan, supaya pembaca layar membaca ulang teks yang sama. */
const ANNOUNCE_DELAY_MS = 50;
/** Bagian yang berganti saat framework dipilih: bingkai preview dan blok kode. */
const CHANGED_REGION = ".frame, [data-code-block]";

let hideTimer: ReturnType<typeof setTimeout> | undefined;

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mulai ulang animasi CSS: lepas atribut, paksa reflow, pasang lagi. */
function restart(element: HTMLElement, attribute: string) {
  element.removeAttribute(attribute);
  void element.offsetWidth;
  element.setAttribute(attribute, "");
}

function isOnScreen(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight
  );
}

function showCard(framework: Framework) {
  const splash = document.querySelector<HTMLElement>("[data-framework-splash]");
  if (!splash) return;
  splash.querySelectorAll<HTMLElement>("[data-splash-fw]").forEach((item) => {
    item.hidden = item.dataset.splashFw !== framework;
  });
  // Tutup lalu buka lagi: animasi mulai dari awal saat pengunjung berganti framework beruntun.
  if (splash.matches(":popover-open")) splash.hidePopover();
  splash.showPopover();
}

function announce(framework: Framework) {
  const region = document.querySelector<HTMLElement>(
    "[data-framework-announce]",
  );
  const message = document.querySelector<HTMLElement>(
    `[data-splash-fw="${framework}"]`,
  )?.dataset.message;
  if (!region || !message) return;
  region.textContent = "";
  setTimeout(() => {
    region.textContent = message;
  }, ANNOUNCE_DELAY_MS);
}

function pulseChangedRegions(framework: Framework) {
  const regions = new Set<HTMLElement>();
  document
    .querySelectorAll<HTMLElement>(`[data-fw="${framework}"]`)
    .forEach((pane) => {
      const region =
        pane.closest<HTMLElement>(CHANGED_REGION) ??
        pane.querySelector<HTMLElement>(CHANGED_REGION);
      if (region && isOnScreen(region)) regions.add(region);
    });
  regions.forEach((region) => restart(region, "data-fw-pulse"));
}

function hide() {
  const splash = document.querySelector<HTMLElement>("[data-framework-splash]");
  if (splash?.matches(":popover-open")) splash.hidePopover();
  document
    .querySelectorAll("[data-fw-pulse]")
    .forEach((region) => region.removeAttribute("data-fw-pulse"));
}

/**
 * Tanda bahwa pengunjung baru saja pindah framework. Hanya dipanggil dari pilihan eksplisit di
 * switcher; pilihan tersimpan atau ?framework= dipasang tanpa tanda ini.
 */
export function showFrameworkSplash(framework: Framework) {
  announce(framework);
  showCard(framework);
  if (!prefersReducedMotion()) pulseChangedRegions(framework);
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hide, VISIBLE_MS);
}
