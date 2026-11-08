<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from "vue";

const base =
  "relative isolate overflow-hidden [--markas-lamp-play:paused] data-[visible]:[--markas-lamp-play:running]";
const layer = "pointer-events-none absolute inset-0 overflow-hidden";
const grow =
  "animate-[markas-lamp_var(--markas-lamp-speed)_cubic-bezier(0.22,1,0.36,1)_both_var(--markas-lamp-play)] motion-reduce:animate-none";
const content = "relative";
const parts = {
  lamp: [
    `absolute top-[calc(3rem-var(--markas-lamp-apex))] right-1/2 h-[calc(var(--markas-lamp-apex)+18rem)] w-[calc(var(--markas-lamp-apex)+18rem)] origin-top-right bg-[conic-gradient(from_180deg_at_100%_0,color-mix(in_oklab,currentColor_6%,transparent),color-mix(in_oklab,currentColor_30%,transparent)_21deg,transparent_27deg)] [mask-image:linear-gradient(to_bottom,transparent_var(--markas-lamp-apex),black_var(--markas-lamp-apex),transparent)] ${grow}`,
    `absolute top-[calc(3rem-var(--markas-lamp-apex))] left-1/2 h-[calc(var(--markas-lamp-apex)+18rem)] w-[calc(var(--markas-lamp-apex)+18rem)] origin-top-left bg-[conic-gradient(from_153deg_at_0_0,transparent,color-mix(in_oklab,currentColor_30%,transparent)_6deg,color-mix(in_oklab,currentColor_6%,transparent)_27deg,transparent_27deg)] [mask-image:linear-gradient(to_bottom,transparent_var(--markas-lamp-apex),black_var(--markas-lamp-apex),transparent)] ${grow}`,
    `absolute top-12 left-1/2 h-24 w-[calc(var(--markas-lamp-w)*1.3)] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_50%_0,color-mix(in_oklab,currentColor_45%,transparent),transparent)] ${grow}`,
    `absolute top-12 left-1/2 h-6 w-[var(--markas-lamp-w)] -translate-x-1/2 -translate-y-full bg-[radial-gradient(50%_100%_at_50%_100%,color-mix(in_oklab,currentColor_30%,transparent),transparent)] ${grow}`,
    `absolute top-12 left-1/2 h-0.5 w-[var(--markas-lamp-w)] -translate-x-1/2 rounded-full bg-current ${grow}`,
  ],
  stage: [
    `absolute inset-0 origin-top-left bg-[conic-gradient(from_118deg_at_0_0,transparent,color-mix(in_oklab,currentColor_38%,transparent)_14deg,color-mix(in_oklab,currentColor_16%,transparent)_30deg,transparent_36deg)] [mask-image:linear-gradient(to_bottom,black_20%,transparent)] ${grow}`,
    `absolute inset-0 origin-top-right bg-[conic-gradient(from_206deg_at_100%_0,transparent,color-mix(in_oklab,currentColor_16%,transparent)_6deg,color-mix(in_oklab,currentColor_38%,transparent)_22deg,transparent_36deg)] [mask-image:linear-gradient(to_bottom,black_20%,transparent)] ${grow}`,
    `absolute -top-16 -left-16 size-40 bg-[radial-gradient(closest-side,color-mix(in_oklab,currentColor_60%,transparent),transparent)] ${grow}`,
    `absolute -top-16 -right-16 size-40 bg-[radial-gradient(closest-side,color-mix(in_oklab,currentColor_60%,transparent),transparent)] ${grow}`,
  ],
  halo: [
    `absolute top-0 left-1/2 h-[calc(var(--markas-lamp-w)*1.2)] w-[calc(var(--markas-lamp-w)*2)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklab,currentColor_32%,transparent),transparent)] ${grow}`,
    `absolute top-0 left-1/2 h-[calc(var(--markas-lamp-w)*0.8)] w-[calc(var(--markas-lamp-w)*1.4)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,transparent_90%,color-mix(in_oklab,currentColor_55%,transparent)_96%,transparent)] ${grow}`,
  ],
};
const colors = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  muted: "text-muted",
};
const sizes = {
  sm: "[--markas-lamp-w:14rem] [--markas-lamp-apex:15rem]",
  md: "[--markas-lamp-w:20rem] [--markas-lamp-apex:22rem]",
  lg: "[--markas-lamp-w:28rem] [--markas-lamp-apex:31rem]",
};
const speeds = {
  slow: "[--markas-lamp-speed:2s]",
  normal: "[--markas-lamp-speed:1.2s]",
  fast: "[--markas-lamp-speed:0.7s]",
};
const keyframes =
  "@keyframes markas-lamp{from{opacity:.4;transform:scaleX(.5)}}";

const props = withDefaults(
  defineProps<{
    /** lamp: one lamp above the content; stage: two lamps from the top corners; halo: a glowing ring from the top. */
    variant?: keyof typeof parts;
    color?: keyof typeof colors;
    size?: keyof typeof sizes;
    speed?: keyof typeof speeds;
  }>(),
  { variant: "lamp", color: "primary", size: "md", speed: "normal" },
);

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

const rootEl = useTemplateRef<HTMLDivElement>("rootRef");
let stop: (() => void) | undefined;
onMounted(() => {
  if (rootEl.value) stop = revealOnView(rootEl.value);
});
onBeforeUnmount(() => stop?.());
</script>

<template>
  <div ref="rootRef" :class="base">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      aria-hidden="true"
      :class="[
        layer,
        colors[props.color],
        sizes[props.size],
        speeds[props.speed],
      ]"
    >
      <div
        v-for="(part, index) in parts[props.variant] ?? parts.lamp"
        :key="index"
        :class="part"
      />
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
