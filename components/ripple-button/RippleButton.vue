<script setup lang="ts">
import { useTemplateRef } from "vue";

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
  }>(),
  { variant: "primary", size: "md" },
);

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const layer = "pointer-events-none absolute inset-0 -z-10";
const wave = "absolute rounded-full bg-current opacity-0";

const WAVE = [
  { scale: "0", opacity: 0.25 },
  { scale: "1", opacity: 0 },
];
const WAVE_DURATION = 600;

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const layerRef = useTemplateRef<HTMLSpanElement>("layer");

/** Adds one wave to the layer, from the pointer or from the center for keyboard clicks. */
function ripple(event: MouseEvent) {
  const target = layerRef.value;
  const button = target?.parentElement;
  if (!target || !button || reducedMotion()) return;
  const rect = button.getBoundingClientRect();
  const fromPointer = event.detail > 0;
  const x = fromPointer ? event.clientX - rect.left : rect.width / 2;
  const y = fromPointer ? event.clientY - rect.top : rect.height / 2;
  const diameter = Math.hypot(rect.width, rect.height) * 2;
  const element = document.createElement("span");
  element.className = wave;
  element.style.cssText = `left:${x - diameter / 2}px;top:${y - diameter / 2}px;width:${diameter}px;height:${diameter}px`;
  target.append(element);
  if (typeof element.animate !== "function") return element.remove();
  element.animate(WAVE, {
    duration: WAVE_DURATION,
    easing: "ease-out",
  }).onfinish = () => element.remove();
}
</script>

<template>
  <button
    type="button"
    :class="[base, variants[props.variant], sizes[props.size]]"
    @click="ripple"
  >
    <span ref="layer" :class="layer" aria-hidden="true" />
    <slot />
  </button>
</template>
