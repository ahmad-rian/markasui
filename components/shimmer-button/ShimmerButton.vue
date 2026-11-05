<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";

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
const sheenVariants = {
  primary: "via-on-primary/30",
  secondary: "via-primary/10",
  ghost: "via-primary/10",
  danger: "via-on-primary/30",
};

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** Length of one shimmer cycle in milliseconds. */
    duration?: number;
  }>(),
  { variant: "primary", size: "md", duration: 2400 },
);

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const sheen =
  "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent";

/** The sheen sweeps across in the first 60% of each cycle, then rests off the button. */
const SWEEP = [
  { translate: "0 0" },
  { translate: "300% 0", offset: 0.6 },
  { translate: "300% 0" },
];

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const sheenRef = useTemplateRef<HTMLSpanElement>("sheen");
let stop = () => {};

onMounted(() => {
  const element = sheenRef.value;
  const button = element?.parentElement;
  if (!element || !button || typeof element.animate !== "function") return;
  if (reducedMotion()) return;
  const animation = element.animate(SWEEP, {
    duration: props.duration,
    iterations: Infinity,
    easing: "ease-in-out",
  });
  if (typeof IntersectionObserver === "undefined") {
    stop = () => animation.cancel();
    return;
  }
  // Pause while the button is off screen.
  const observer = new IntersectionObserver(([entry]) =>
    entry?.isIntersecting ? animation.play() : animation.pause(),
  );
  observer.observe(button);
  stop = () => {
    observer.disconnect();
    animation.cancel();
  };
});
onBeforeUnmount(() => stop());
</script>

<template>
  <button
    type="button"
    :class="[base, variants[props.variant], sizes[props.size]]"
  >
    <slot />
    <span
      ref="sheen"
      :class="[sheen, sheenVariants[props.variant]]"
      aria-hidden="true"
    />
  </button>
</template>
