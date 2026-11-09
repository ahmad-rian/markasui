import { onPageLoad } from "./lifecycle";
import { getFramework } from "./prefs";

/** Jarak sebelum viewport saat contoh Angular mulai dipasang. */
const LAZY_MARGIN = "300px 0px";
/** Bundle AOT dari scripts/angular-previews.ts. Runtime Angular hanya diunduh saat Angular dipilih. */
const BUNDLE = "/angular/preview.js";

type PreviewBundle = {
  mount: (host: HTMLElement, name: string) => Promise<boolean>;
};
let bundle: Promise<PreviewBundle> | undefined;
let observer: IntersectionObserver | undefined;

async function mount(host: HTMLElement) {
  host.dataset.mounted = "";
  try {
    bundle ??= import(/* @vite-ignore */ BUNDLE) as Promise<PreviewBundle>;
    await (await bundle).mount(host, host.dataset.angularPreview!);
  } catch (error) {
    bundle = undefined;
    delete host.dataset.mounted;
    console.error("Preview Angular gagal dimuat", error);
  }
}

function init() {
  observer?.disconnect();
  if (getFramework() !== "angular") return;
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer?.unobserve(entry.target);
        const host = entry.target.querySelector<HTMLElement>(
          "[data-angular-preview]:not([data-mounted])",
        );
        if (host) void mount(host);
      }),
    { rootMargin: LAZY_MARGIN },
  );
  document
    .querySelectorAll<HTMLElement>("[data-angular-preview]:not([data-mounted])")
    // Host berupa display: contents (tidak punya kotak), jadi yang diamati adalah pane-nya.
    .forEach((host) => observer?.observe(host.closest("[data-fw]") ?? host));
}

onPageLoad(init);
document.addEventListener("markas:framework", init);
// Tombol reload preview memasang ulang HTML asli (scripts/preview.ts); contoh Angular dipasang lagi.
document.addEventListener("click", (event) => {
  if ((event.target as HTMLElement).closest("[data-preview-reload]"))
    setTimeout(init);
});
