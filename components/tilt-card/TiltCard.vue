<script setup lang="ts">
import { onBeforeUnmount } from "vue";

const props = withDefaults(
  defineProps<{
    /** Largest rotation in degrees, reached at the card edges. */
    maxAngle?: number;
    /** Shows a soft light that follows the pointer. */
    glare?: boolean;
  }>(),
  { maxAngle: 10, glare: true },
);

const base =
  "group/tilt relative isolate rounded-xl transition-[transform,translate,scale,box-shadow] duration-500 ease-out [transform:perspective(800px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] has-[:focus-visible]:-translate-y-1 has-[:focus-visible]:shadow-overlay data-[state=active]:scale-[1.02] data-[state=active]:duration-150 motion-reduce:transition-none motion-reduce:[transform:none] [&_[data-depth]]:transition-[translate] [&_[data-depth]]:duration-500 [&_[data-depth]]:ease-out data-[state=active]:[&_[data-depth]]:duration-150 motion-reduce:[&_[data-depth]]:transition-none";
const glareClass =
  "pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(circle_at_var(--glare-x,50%)_var(--glare-y,50%),color-mix(in_oklab,var(--glare)_45%,transparent),transparent_65%)] opacity-0 transition-opacity duration-300 ease-out [--glare:var(--color-surface)] group-data-[state=active]/tilt:opacity-100 motion-reduce:hidden dark:[--glare:var(--color-ink)]";

const PROPS = ["--tilt-x", "--tilt-y", "--glare-x", "--glare-y"];

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const layers = (card: HTMLElement) =>
  card.querySelectorAll<HTMLElement>("[data-depth]");

/** Rotate toward the pointer, move the glare, and shift depth layers by their data-depth in px. */
function tilt(card: HTMLElement, rect: DOMRect, x: number, y: number) {
  const max = props.maxAngle;
  const px = (x - rect.left) / rect.width - 0.5;
  const py = (y - rect.top) / rect.height - 0.5;
  card.dataset.state = "active";
  card.style.setProperty("--tilt-x", `${-py * 2 * max}deg`);
  card.style.setProperty("--tilt-y", `${px * 2 * max}deg`);
  card.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
  card.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
  for (const layer of layers(card)) {
    const depth = Number(layer.dataset.depth) || 0;
    layer.style.translate = `${px * 2 * depth}px ${py * 2 * depth}px`;
  }
}

let stop: (() => void) | null = null;
onBeforeUnmount(() => stop?.());

/**
 * Follow the pointer against the card's flat box, measured on enter. The tilted card's own edges
 * move away from the pointer, so its pointerleave would fire near the edges and make it flicker.
 */
function enter(event: PointerEvent) {
  if (stop || still()) return;
  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const move = ({ clientX: x, clientY: y }: MouseEvent) => {
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom)
      return stop?.();
    tilt(card, rect, x, y);
  };
  stop = () => {
    stop = null;
    document.removeEventListener("pointermove", move);
    delete card.dataset.state;
    for (const prop of PROPS) card.style.removeProperty(prop);
    for (const layer of layers(card)) layer.style.translate = "";
  };
  document.addEventListener("pointermove", move);
  move(event);
}
</script>

<template>
  <div :class="base" @pointerenter="enter">
    <slot />
    <span v-if="props.glare" aria-hidden="true" :class="glareClass"></span>
  </div>
</template>
