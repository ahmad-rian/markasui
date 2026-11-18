/**
 * Lottie player shared by the React, Vue, Svelte, Astro, and Angular versions of the belajar page.
 * lottie-web (light SVG build) and the animation data load through dynamic imports, so neither
 * blocks first paint. The container reserves its size in CSS, which keeps the layout still.
 *
 * - Plays once when the container scrolls into view and pauses while it is off-screen.
 * - With prefers-reduced-motion it shows the finished drawing without animating.
 * - The returned function destroys the animation; call it on unmount.
 * - Sets data-lottie="ready" (or "error") on the container once settled, for tests and styling.
 */
import type { AnimationItem } from "lottie-web";

const sources = {
  hero: () => import("./hero.json"),
  study: () => import("./study.json"),
  mentor: () => import("./mentor.json"),
  certificate: () => import("./certificate.json"),
};

export type LottieName = keyof typeof sources;

/** Share of the container that must be visible before it plays. */
const VISIBLE_THRESHOLD = 0.4;

export function playLottie(container: HTMLElement, name: LottieName) {
  let disposed = false;
  let animation: AnimationItem | undefined;
  let observer: IntersectionObserver | undefined;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Promise.all([import("lottie-web/build/player/lottie_light"), sources[name]()])
    .then(([player, data]) => {
      if (disposed) return;
      const item = player.default.loadAnimation({
        container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        // lottie-web annotates the data it receives, so every instance gets its own copy.
        animationData: structuredClone(data.default),
      });
      animation = item;
      if (still || !("IntersectionObserver" in window)) {
        item.goToAndStop(item.totalFrames - 1, true);
      } else {
        observer = new IntersectionObserver(
          ([entry]) => (entry?.isIntersecting ? item.play() : item.pause()),
          { threshold: VISIBLE_THRESHOLD },
        );
        observer.observe(container);
      }
      container.dataset.lottie = "ready";
    })
    .catch(() => {
      // The reserved box stays empty; the page keeps working without the drawing.
      if (!disposed) container.dataset.lottie = "error";
    });

  return () => {
    disposed = true;
    observer?.disconnect();
    animation?.destroy();
  };
}
