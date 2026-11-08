<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer = "absolute inset-0 overflow-hidden";
const grid =
  "absolute top-1/2 left-1/2 grid grid-cols-[repeat(var(--markas-boxes-cols),var(--markas-boxes-size))] auto-rows-[var(--markas-boxes-size)] border-t border-l border-line";
const cell =
  "border-r border-b border-line transition-colors duration-1000 ease-out hover:bg-current/40 hover:duration-0 motion-reduce:transition-none";
const ember =
  "animate-[markas-boxes-glow_var(--markas-boxes-duration)_ease-in-out_infinite] motion-reduce:animate-none";
const content =
  "pointer-events-none relative [&_:is(a,button,input,select,textarea,label,summary)]:pointer-events-auto";
const variants = {
  skewed: {
    layer:
      "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]",
    grid: "[transform:translate(-50%,-50%)_skewX(-48deg)_skewY(14deg)]",
  },
  flat: {
    layer:
      "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]",
    grid: "-translate-x-1/2 -translate-y-1/2",
  },
  perspective: {
    layer:
      "[perspective:520px] [mask-image:linear-gradient(to_bottom,transparent_25%,black_60%)]",
    grid: "[transform:translate(-50%,-38%)_rotateX(58deg)]",
  },
};
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "9s", normal: "6s", fast: "3.5s" };
const keyframes =
  "@keyframes markas-boxes-glow{0%,100%{box-shadow:none}50%{box-shadow:inset 0 0 0 999px color-mix(in oklab,currentColor 30%,transparent)}}";
const MAX_CELLS = 600;
const MAX_SIDE = 40;
const EMBER_TARGET = 6;
const EMBER_DELAY_MS = 700;

const side = (value: number) =>
  Math.max(1, Math.min(Math.trunc(value), MAX_SIDE));

/** Sel ke-i. Sekitar 6% sel (dua modulus berbeda supaya tidak membentuk garis) menyala pelan supaya latar terasa hidup tanpa hover. */
function makeCells(rows: number, cols: number) {
  const columns = side(cols);
  const total = Math.min(side(rows) * columns, MAX_CELLS);
  return Array.from({ length: total }, (_, index) => {
    const lit = ((index * 7) % 13) + ((index * index) % 11) === EMBER_TARGET;
    return lit
      ? { lit, style: { animationDelay: `${(index % 9) * -EMBER_DELAY_MS}ms` } }
      : { lit, style: undefined };
  });
}

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    rows?: number;
    cols?: number;
    size?: number;
    speed?: keyof typeof speeds;
    color?: keyof typeof colors;
  }>(),
  {
    variant: "skewed",
    rows: 12,
    cols: 18,
    size: 40,
    speed: "normal",
    color: "primary",
  },
);

const vars = computed(() => ({
  "--markas-boxes-cols": side(props.cols),
  "--markas-boxes-size": `${props.size}px`,
  "--markas-boxes-duration": speeds[props.speed],
}));
const cells = computed(() => makeCells(props.rows, props.cols));
</script>

<template>
  <div :class="base" :style="vars">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      aria-hidden="true"
      :class="[layer, variants[props.variant].layer, colors[props.color]]"
    >
      <div :class="[grid, variants[props.variant].grid]">
        <span
          v-for="(item, index) in cells"
          :key="index"
          :class="[cell, item.lit && ember]"
          :style="item.style"
        />
      </div>
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
