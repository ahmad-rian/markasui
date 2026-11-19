import type { Framework } from "@markasui/registry/frameworks";

/** Lama splash tampil, sama dengan durasi animasi fw-splash di FrameworkSplash.astro. */
const VISIBLE_MS = 1000;
/** Jeda singkat setelah region dikosongkan, supaya pembaca layar membaca ulang teks yang sama. */
const ANNOUNCE_DELAY_MS = 50;

let hideTimer: ReturnType<typeof setTimeout> | undefined;

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

function hide() {
  const splash = document.querySelector<HTMLElement>("[data-framework-splash]");
  if (splash?.matches(":popover-open")) splash.hidePopover();
}

/**
 * Tanda bahwa pengunjung baru saja pindah framework. Hanya dipanggil dari pilihan eksplisit di
 * switcher; pilihan tersimpan atau ?framework= dipasang tanpa tanda ini.
 */
export function showFrameworkSplash(framework: Framework) {
  announce(framework);
  showCard(framework);
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hide, VISIBLE_MS);
}
