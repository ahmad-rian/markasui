/**
 * Lottie cup on the floating coffee card (components/CoffeeLauncher.astro). The player (lottie-web, light SVG
 * build) and public/lottie/coffee.json load only when the launcher shows, through a dynamic import and a
 * same-origin fetch, so neither counts toward the page's JS or delays the first paint. A still SVG cup stays in
 * place until the animation is ready and whenever loading fails.
 *
 * - The steam rises a few times, then the cup rests on a steamy frame; hovering the card plays it once more.
 * - Pauses while the tab is hidden.
 * - With prefers-reduced-motion it only shows the resting frame.
 * - Sets data-lottie on the container: "loading", "ready" (animated), "still" (reduced motion) or "error".
 */
import type { AnimationItem } from "lottie-web";
import { onAfterSwap } from "./lifecycle";

const SOURCE = "/lottie/coffee.json";
/** Times the steam rises before the cup rests. */
const LOOPS = 3;
/** Frame with the most steam: the resting picture, also used for reduced motion. */
const STILL_FRAME = 26;

let dispose: (() => void) | undefined;
let data: Promise<unknown> | undefined;

function loadData(): Promise<unknown> {
  data ??= fetch(SOURCE).then((response) => {
    if (!response.ok) throw new Error(`${SOURCE}: HTTP ${response.status}`);
    return response.json();
  });
  return data;
}

/** Plays the steam LOOPS times, pausing while the tab is hidden; returns the cleanup. */
function animate(animation: AnimationItem, toggle: HTMLElement | null) {
  let loopsLeft = LOOPS;
  const rest = () => animation.goToAndStop(STILL_FRAME, true);
  const start = () => {
    if (!document.hidden) animation.goToAndPlay(0, true);
  };
  const onComplete = () => {
    loopsLeft -= 1;
    if (loopsLeft > 0) start();
    else rest();
  };
  const onVisibility = () => {
    if (document.hidden) animation.pause();
    else if (loopsLeft > 0) animation.play();
  };
  const onHover = () => {
    if (loopsLeft > 0) return;
    loopsLeft = 1;
    start();
  };
  animation.addEventListener("complete", onComplete);
  document.addEventListener("visibilitychange", onVisibility);
  toggle?.addEventListener("pointerenter", onHover);
  if (document.hidden) rest();
  else start();
  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    toggle?.removeEventListener("pointerenter", onHover);
  };
}

export function playCoffeeCup(container: HTMLElement): void {
  if (container.dataset.lottie) return;
  container.dataset.lottie = "loading";
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  Promise.all([import("lottie-web/build/player/lottie_light"), loadData()])
    .then(([player, animationData]) => {
      if (!container.isConnected) return;
      dispose?.();
      const animation = player.default.loadAnimation({
        container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        // lottie-web annotates the data it receives, so every page gets its own copy.
        animationData: structuredClone(animationData),
      });
      let stop: (() => void) | undefined;
      const begin = () => {
        if (still) animation.goToAndStop(STILL_FRAME, true);
        else
          stop = animate(
            animation,
            container.closest<HTMLElement>("[data-coffee-toggle]"),
          );
        container.dataset.lottie = still ? "still" : "ready";
      };
      // Inline data can finish loading inside loadAnimation, before a DOMLoaded listener could be added.
      if (animation.isLoaded) begin();
      else animation.addEventListener("DOMLoaded", begin);
      dispose = () => {
        stop?.();
        animation.destroy();
        dispose = undefined;
      };
    })
    .catch(() => {
      // The still cup stays; try the download again on the next page.
      data = undefined;
      if (container.isConnected) container.dataset.lottie = "error";
    });
}

// ClientRouter: the old launcher leaves with the page, so its animation goes too.
onAfterSwap(() => dispose?.());
