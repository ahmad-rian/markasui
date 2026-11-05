<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";

type Target = "page" | "parent";

const props = withDefaults(
  defineProps<{
    target?: Target;
    color?: "primary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
  }>(),
  { target: "page", color: "primary", size: "sm" },
);

const root = "pointer-events-none z-50 w-full";
const bar = "h-full w-full origin-left";
const targets = {
  page: "fixed inset-x-0 top-0",
  parent: "sticky top-0 left-0",
};
const sizes = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-1.5",
};
const colors = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/**
 * Isi bar sesuai posisi gulir halaman atau elemen induk. Pembaruan digabung per frame.
 * Mengembalikan fungsi pelepas.
 */
function trackScroll(element: HTMLElement, fill: HTMLElement, target: Target) {
  const scroller = target === "parent" ? element.parentElement : null;
  const source = scroller ?? document.documentElement;
  const events: EventTarget = scroller ?? window;
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = source.scrollHeight - source.clientHeight;
    const progress =
      max > 0 ? Math.min(Math.max(source.scrollTop / max, 0), 1) : 0;
    fill.style.transform = `scaleX(${progress})`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  events.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    events.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
const fillEl = useTemplateRef<HTMLDivElement>("fillRef");
let stop = () => {};

function start() {
  stop();
  stop = () => {};
  if (!rootEl.value || !fillEl.value) return;
  stop = trackScroll(rootEl.value, fillEl.value, props.target);
}

onMounted(start);
watch(() => props.target, start, { flush: "post" });
onBeforeUnmount(() => stop());
</script>

<template>
  <div
    ref="rootRef"
    aria-hidden="true"
    :class="[root, targets[props.target], sizes[props.size]]"
  >
    <div
      ref="fillRef"
      :class="[bar, colors[props.color]]"
      style="transform: scaleX(0)"
    ></div>
  </div>
</template>
