<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    vertical?: boolean;
    reverse?: boolean;
    duration?: number;
    pauseOnHover?: boolean;
    fade?: boolean;
  }>(),
  {
    vertical: false,
    reverse: false,
    duration: 20,
    pauseOnHover: true,
    fade: true,
  },
);

const root = "flex overflow-hidden";
const copy = "flex shrink-0 justify-around gap-4";
const orientations = {
  horizontal: { root: "flex-row", copy: "min-w-full flex-row pr-4" },
  vertical: { root: "flex-col", copy: "min-h-full flex-col pb-4" },
};
const fades = {
  horizontal: "mask-x-from-85%",
  vertical: "mask-y-from-85%",
};
const COPIES = [0, 1];
const MS_PER_SECOND = 1000;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Geser setiap salinan sejauh lebarnya sendiri tanpa henti. Berhenti saat kursor di atas, fokus di dalam,
 * atau marquee di luar layar. Mengembalikan fungsi pelepas.
 */
function startMarquee(
  element: HTMLElement,
  options: {
    vertical: boolean;
    reverse: boolean;
    duration: number;
    pauseOnHover: boolean;
  },
) {
  const axis = options.vertical ? "Y" : "X";
  const animations = Array.from(element.children).flatMap(
    (child) =>
      child.animate?.(
        [
          { transform: `translate${axis}(0)` },
          { transform: `translate${axis}(-100%)` },
        ],
        {
          duration: options.duration * MS_PER_SECOND,
          iterations: Infinity,
          direction: options.reverse ? "reverse" : "normal",
        },
      ) ?? [],
  );
  const state = { hover: false, focus: false, hidden: false };
  const sync = () => {
    const paused =
      (options.pauseOnHover && state.hover) || state.focus || state.hidden;
    for (const animation of animations)
      if (paused) animation.pause();
      else animation.play();
  };
  const listeners: [string, () => void][] = [
    ["mouseenter", () => ((state.hover = true), sync())],
    ["mouseleave", () => ((state.hover = false), sync())],
    ["focusin", () => ((state.focus = true), sync())],
    ["focusout", () => ((state.focus = false), sync())],
  ];
  for (const [type, listener] of listeners)
    element.addEventListener(type, listener);
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          state.hidden = !entries.some((entry) => entry.isIntersecting);
          sync();
        });
  observer?.observe(element);

  return () => {
    observer?.disconnect();
    for (const [type, listener] of listeners)
      element.removeEventListener(type, listener);
    for (const animation of animations) animation.cancel();
  };
}

const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
let stop = () => {};

function start() {
  stop();
  stop = () => {};
  const element = rootEl.value;
  if (!element || reducedMotion()) return;
  stop = startMarquee(element, {
    vertical: props.vertical,
    reverse: props.reverse,
    duration: props.duration,
    pauseOnHover: props.pauseOnHover,
  });
}

const orientation = () => (props.vertical ? "vertical" : "horizontal");

onMounted(start);
watch(
  () => [props.vertical, props.reverse, props.duration, props.pauseOnHover],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => stop());
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      root,
      orientations[orientation()].root,
      props.fade && fades[orientation()],
    ]"
  >
    <div
      v-for="index in COPIES"
      :key="index"
      :aria-hidden="index > 0 ? 'true' : undefined"
      :inert="index > 0 ? true : undefined"
      :class="[copy, orientations[orientation()].copy]"
    >
      <slot />
    </div>
  </div>
</template>
