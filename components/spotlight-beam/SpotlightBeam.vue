<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";

const base =
  "relative isolate overflow-hidden [--markas-beam-play:paused] data-[visible]:[--markas-beam-play:running]";
const layer = "pointer-events-none absolute inset-0 overflow-hidden";
const source =
  "absolute inset-0 [translate:calc(var(--markas-beam-x,0)*4%)_calc(var(--markas-beam-y,0)*4%)] animate-[markas-beam_var(--markas-beam-speed)_cubic-bezier(0.22,1,0.36,1)_both_var(--markas-beam-play)] transition-[translate] duration-700 ease-out motion-reduce:animate-none motion-reduce:transition-none";
const beams = [
  "absolute top-0 left-[var(--markas-beam-left)] h-[90%] w-[140%] origin-left -translate-y-1/2 rotate-[calc(var(--markas-beam-angle)+6deg)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_calc(var(--markas-beam-strength)*0.35),transparent),transparent)]",
  "absolute top-0 left-[var(--markas-beam-left)] h-[50%] w-[170%] origin-left -translate-y-1/2 rotate-[var(--markas-beam-angle)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_var(--markas-beam-strength),transparent),transparent)]",
  "absolute top-0 left-[var(--markas-beam-left)] h-[22%] w-[140%] origin-left -translate-y-1/2 rotate-[calc(var(--markas-beam-angle)-2deg)] bg-[radial-gradient(ellipse_100%_50%_at_0%_50%,color-mix(in_oklab,currentColor_calc(var(--markas-beam-strength)*1.1),transparent),transparent)]",
];
const content = "relative";
const variants = {
  "top-left":
    "[--markas-beam-angle:32deg] [--markas-beam-left:0%] [--markas-beam-dx:-8%]",
  "top-right":
    "-scale-x-100 [--markas-beam-angle:32deg] [--markas-beam-left:0%] [--markas-beam-dx:-8%]",
  center:
    "[--markas-beam-angle:90deg] [--markas-beam-left:50%] [--markas-beam-dx:0%]",
};
const colors = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  muted: "text-muted",
};
const intensities = {
  soft: "[--markas-beam-strength:22%]",
  medium: "[--markas-beam-strength:34%]",
  strong: "[--markas-beam-strength:50%]",
};
const speeds = {
  slow: "[--markas-beam-speed:2.4s]",
  normal: "[--markas-beam-speed:1.6s]",
  fast: "[--markas-beam-speed:0.9s]",
};
const keyframes =
  "@keyframes markas-beam{from{opacity:0;transform:translate(var(--markas-beam-dx),-10%) scale(.9)}}";

const props = withDefaults(
  defineProps<{
    /** Where the light comes from. */
    variant?: keyof typeof variants;
    color?: keyof typeof colors;
    intensity?: keyof typeof intensities;
    speed?: keyof typeof speeds;
    /** The light source leans a little toward the pointer. */
    follow?: boolean;
  }>(),
  {
    variant: "top-left",
    color: "primary",
    intensity: "medium",
    speed: "normal",
    follow: false,
  },
);

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mark the root visible the first time it scrolls into view, which starts the entrance. */
function revealOnView(element: HTMLElement): (() => void) | undefined {
  const show = () => element.setAttribute("data-visible", "");
  if (typeof IntersectionObserver === "undefined") {
    show();
    return undefined;
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    show();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

/** Store the pointer position from -1 to 1 so the light source leans toward it. */
function lean(event: PointerEvent) {
  if (!props.follow || reducedMotion()) return;
  const root = event.currentTarget as HTMLElement;
  const rect = root.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  root.style.setProperty("--markas-beam-x", x.toFixed(3));
  root.style.setProperty("--markas-beam-y", y.toFixed(3));
}

const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
let stop: (() => void) | undefined;
onMounted(() => {
  if (rootEl.value) stop = revealOnView(rootEl.value);
});
onBeforeUnmount(() => stop?.());
</script>

<template>
  <div ref="rootRef" :class="base" @pointermove="lean">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      aria-hidden="true"
      :class="[
        layer,
        colors[props.color],
        intensities[props.intensity],
        speeds[props.speed],
      ]"
    >
      <div :class="[source, variants[props.variant] ?? variants['top-left']]">
        <div v-for="(beam, index) in beams" :key="index" :class="beam" />
      </div>
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
