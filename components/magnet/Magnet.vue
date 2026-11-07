<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    /** Share of the pointer distance the element follows, 0 to 1. For repel, how far it is pushed. */
    strength?: number;
    /** Distance in px beyond the element edges where the pull starts. */
    radius?: number;
    /** Move toward the pointer or away from it. */
    mode?: "attract" | "repel";
  }>(),
  { strength: 0.35, radius: 80, mode: "attract" },
);

const base =
  "w-fit transition-[translate,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] has-[:focus-visible]:scale-105 data-[state=active]:duration-150 data-[state=active]:ease-out motion-reduce:transition-none [&_[data-depth]]:inline-block [&_[data-depth]]:transition-[translate] [&_[data-depth]]:duration-500 [&_[data-depth]]:ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=active]:[&_[data-depth]]:duration-150 motion-reduce:[&_[data-depth]]:transition-none";

type MagnetMode = "attract" | "repel";
type Options = { strength: number; radius: number; mode: MagnetMode };

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Pull the element toward (or push it away from) a mouse within `radius` px of its edges, then let
 * it spring back. Children with data-depth="0.5" travel that much further. Listens only while on screen.
 */
function startMagnet(root: HTMLElement, o: Options) {
  let x = 0;
  let y = 0;
  const set = (nx: number, ny: number) => {
    x = nx;
    y = ny;
    if (x || y) root.dataset.state = "active";
    else delete root.dataset.state;
    root.style.translate = x || y ? `${x}px ${y}px` : "";
    for (const layer of root.querySelectorAll<HTMLElement>("[data-depth]")) {
      const depth = Number(layer.dataset.depth) || 0;
      layer.style.translate = x || y ? `${x * depth}px ${y * depth}px` : "";
    }
  };
  const move = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = root.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2 - x);
    const dy = e.clientY - (r.top + r.height / 2 - y);
    const gap = Math.hypot(
      Math.max(Math.abs(dx) - r.width / 2, 0),
      Math.max(Math.abs(dy) - r.height / 2, 0),
    );
    const near = Math.max(1 - gap / o.radius, 0);
    if (o.mode === "repel") {
      const push = (near * o.radius * o.strength) / (Math.hypot(dx, dy) || 1);
      return set(-dx * push, -dy * push);
    }
    set(dx * near * o.strength, dy * near * o.strength);
  };
  const reset = () => set(0, 0);
  const html = document.documentElement;
  const listen = (on: boolean) => {
    if (on) {
      document.addEventListener("pointermove", move);
      html.addEventListener("pointerleave", reset);
      return;
    }
    document.removeEventListener("pointermove", move);
    html.removeEventListener("pointerleave", reset);
    reset();
  };
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver(([entry]) => listen(!!entry?.isIntersecting));
  if (observer) observer.observe(root);
  else listen(true);
  return () => {
    observer?.disconnect();
    listen(false);
  };
}

const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
let stop = () => {};
function start() {
  stop();
  stop = () => {};
  if (rootEl.value && !still()) stop = startMagnet(rootEl.value, { ...props });
}
onMounted(start);
watch(() => [props.strength, props.radius, props.mode], start, {
  flush: "post",
});
onBeforeUnmount(() => stop());
</script>

<template>
  <div ref="rootRef" :class="base">
    <slot />
  </div>
</template>
