import type { Alpine as AlpineType } from "alpinejs";
import { onPageLoad } from "./lifecycle";
import { getFramework } from "./prefs";

/** Jarak sebelum viewport saat pane Blade lazy mulai diinisialisasi Alpine. */
const LAZY_MARGIN = "300px 0px";
let started: Promise<AlpineType> | undefined;
let lazyObserver: IntersectionObserver | undefined;

/** Pane dengan x-ignore + data-alpine-lazy (dinding komponen landing) baru dihidupkan saat mendekati viewport. */
function observeLazy(Alpine: AlpineType) {
  lazyObserver?.disconnect();
  lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const pane = entry.target as HTMLElement;
        lazyObserver?.unobserve(pane);
        pane.removeAttribute("x-ignore");
        delete pane.dataset.alpineLazy;
        Alpine.initTree(pane);
      });
    },
    { rootMargin: LAZY_MARGIN },
  );
  document
    .querySelectorAll("[data-alpine-lazy]")
    .forEach((pane) => lazyObserver?.observe(pane));
}

/** Alpine hanya diunduh kalau halaman punya preview Blade dan framework Blade sedang dipilih. */
function startIfNeeded() {
  if (
    started ||
    getFramework() !== "blade" ||
    !document.querySelector("[x-data]")
  )
    return;
  started = import("alpinejs").then(({ default: Alpine }) => {
    Alpine.start();
    return Alpine;
  });
}

// Alpine mengamati seluruh dokumen, jadi DOM baru setelah navigasi ikut diinisialisasi otomatis.
// Pane lazy (x-ignore) dilewati Alpine, jadi diamati ulang setiap halaman dimuat.
function init() {
  startIfNeeded();
  started?.then(observeLazy, (error: unknown) =>
    console.error("Alpine gagal dimuat", error),
  );
}
onPageLoad(init);
document.addEventListener("markas:framework", init);
