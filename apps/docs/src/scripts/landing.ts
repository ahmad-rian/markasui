import { FRAMEWORKS, type Framework } from "@markasui/registry/frameworks";
import { onPageLoad } from "./lifecycle";
import { getFramework, hasStoredFramework, isFramework } from "./prefs";

/*
 * Dekorasi bergerak (cahaya dan berkas di .lp-bg) hanya beranimasi saat bingkainya terlihat dan
 * tab aktif. Bingkai yang diamati, bukan .lp-bg, karena isi section content-visibility: auto
 * belum di-layout sebelum mendekati viewport.
 */
const visibleFrames = new WeakSet<Element>();
let motionObserver: IntersectionObserver | undefined;

const backdrops = () => document.querySelectorAll<HTMLElement>(".lp-bg");

function syncMotion() {
  backdrops().forEach((bg) => {
    const frame = bg.parentElement;
    const running =
      !document.hidden && frame !== null && visibleFrames.has(frame);
    bg.classList.toggle("lp-still", !running);
  });
}

onPageLoad(() => {
  motionObserver?.disconnect();
  motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleFrames.add(entry.target);
      else visibleFrames.delete(entry.target);
    });
    syncMotion();
  });
  backdrops().forEach((bg) => {
    if (bg.parentElement) motionObserver?.observe(bg.parentElement);
  });
});
document.addEventListener("visibilitychange", syncMotion);

/*
 * Kata framework di judul. Kalau pengunjung pernah memilih framework, kata itu langsung tampil dan
 * tidak berputar. Tanpa pilihan tersimpan, kata berputar Blade -> React -> Vue -> Svelte -> Astro -> Angular (dijeda saat hero tidak
 * terlihat atau tab tersembunyi) sampai pengunjung memilih di pill.
 */
const ORDER: readonly Framework[] = FRAMEWORKS;
const ROTATE_MS = 2400;
let timer: ReturnType<typeof setInterval> | undefined;

const rotator = () =>
  document.querySelector<HTMLElement>("[data-hero-rotator]");
const heroStill = () =>
  document.querySelector(".lp-hero > .lp-bg")?.classList.contains("lp-still") ??
  false;

function stop() {
  clearInterval(timer);
  timer = undefined;
}

/** Ganti kata dengan animasi flip: kata lama keluar ke atas, kata baru masuk dari bawah. */
function show(root: HTMLElement, next: Framework) {
  const previous = root.dataset.active;
  if (previous === next) return;
  root.querySelectorAll<HTMLElement>("[data-word]").forEach((word) => {
    word.toggleAttribute("data-leaving", word.dataset.word === previous);
  });
  root.dataset.active = next;
}

function tick() {
  const root = rotator();
  if (!root) return stop();
  if (heroStill()) return;
  const index = ORDER.indexOf(root.dataset.active as Framework);
  show(root, ORDER[(index + 1) % ORDER.length]!);
}

onPageLoad(() => {
  stop();
  const root = rotator();
  if (!root) return;
  root.dataset.active = getFramework();
  if (
    hasStoredFramework() ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  timer = setInterval(tick, ROTATE_MS);
});

document.addEventListener("markas:framework", (event) => {
  stop();
  const root = rotator();
  const framework = (event as CustomEvent<unknown>).detail;
  if (root && isFramework(framework)) show(root, framework);
});
document.addEventListener("astro:before-swap", stop);

/* Instrument Serif untuk kata aksen diunduh setelah load, jadi tidak ikut menunda LCP. */
const SERIF = 'italic 400 1em "Instrument Serif"';
const SERIF_DELAY_MS = 300;
const enableSerif = () => {
  document.documentElement.dataset.serif = "";
};
const loadSerif = () => {
  document.fonts
    .load(SERIF)
    .then(enableSerif, (error: unknown) =>
      console.warn("Instrument Serif gagal dimuat", error),
    );
};
/** Tunggu sampai frame pertama tergambar dan browser senggang, baru unduh font. */
const loadSerifLater = () => {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => setTimeout(loadSerif, SERIF_DELAY_MS)),
  );
};
onPageLoad(() => {
  if (document.fonts.check(SERIF)) enableSerif();
  else if (document.readyState === "complete") loadSerifLater();
  else addEventListener("load", loadSerifLater, { once: true });
});
