import { FRAMEWORKS, type Framework } from "@markasui/registry/frameworks";
import { onPageLoad } from "./lifecycle";
import { getFramework, isFramework } from "./prefs";

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
 * Kata framework di judul berputar terus melewati keenam framework (dijeda saat hero tidak terlihat,
 * tab tersembunyi, atau reduced motion). Memilih di pill langsung menampilkan framework itu, lalu putaran berlanjut.
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
  fitWidth(root);
  markPill(next);
}

/** Sorotan pill hero ikut bergeser bersama kata yang berputar. */
function markPill(framework: string) {
  document
    .querySelectorAll<HTMLElement>(".lp-switch [role=radio]")
    .forEach((radio) =>
      radio.toggleAttribute("data-shown", radio.dataset.value === framework),
    );
}

/** Lebar slot mengikuti kata yang tampil, jadi tidak ada celah kosong setelah kata pendek. */
function fitWidth(root: HTMLElement) {
  const word = root.querySelector<HTMLElement>(
    `[data-word="${root.dataset.active}"]`,
  );
  if (word) root.style.width = `${word.offsetWidth}px`;
}

function start() {
  stop();
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  timer = setInterval(tick, ROTATE_MS);
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
  fitWidth(root);
  markPill(root.dataset.active);
  start();
});

document.addEventListener("markas:framework", (event) => {
  const root = rotator();
  const framework = (event as CustomEvent<unknown>).detail;
  if (!root || !isFramework(framework)) return;
  show(root, framework);
  start();
});
document.addEventListener("astro:before-swap", stop);

/* Instrument Serif untuk kata aksen diunduh setelah load, jadi tidak ikut menunda LCP. */
const SERIF = 'italic 400 1em "Instrument Serif"';
const SERIF_DELAY_MS = 300;
const enableSerif = () => {
  document.documentElement.dataset.serif = "";
  // Serif mengubah lebar kata framework: ukur ulang slotnya setelah font tergambar.
  requestAnimationFrame(() => {
    const root = rotator();
    if (root) fitWidth(root);
  });
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
