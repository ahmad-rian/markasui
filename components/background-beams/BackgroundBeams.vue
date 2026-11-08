<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]";
const track = "opacity-15";
const beams = {
  flow: "animate-[markas-beams-flow_var(--markas-beams-duration)_linear_infinite] motion-reduce:animate-none",
  pulse:
    "animate-[markas-beams-pulse_var(--markas-beams-duration)_ease-in-out_infinite] motion-reduce:animate-none",
};
const rainLayer = "pointer-events-none absolute inset-0";
const floor = "absolute inset-x-0 bottom-0 h-px bg-current opacity-30";
const drop =
  "absolute top-0 h-full w-px animate-[markas-beams-fall_var(--markas-beams-duration)_linear_infinite] bg-[linear-gradient(to_bottom,transparent_75%,currentColor)] motion-reduce:animate-none";
const splash =
  "absolute bottom-0 size-10 -translate-x-1/2 translate-y-1/2 animate-[markas-beams-splash_var(--markas-beams-duration)_linear_infinite] rounded-full bg-[radial-gradient(circle,currentColor,transparent_65%)] opacity-0 motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "12s", normal: "7s", fast: "4s" };
const keyframes =
  "@keyframes markas-beams-flow{from{stroke-dashoffset:14}to{stroke-dashoffset:-100}}@keyframes markas-beams-pulse{0%,100%{opacity:.1}50%{opacity:.9}}@keyframes markas-beams-fall{0%{translate:0 -100%;opacity:1}70%{translate:0 0;opacity:1}71%,100%{translate:0 0;opacity:0}}@keyframes markas-beams-splash{0%,69%{opacity:0;scale:.3}72%{opacity:1}100%{opacity:0;scale:1.6}}";
const MAX_BEAMS = 16;
const BEAM_DELAY_MS = 900;
const RATES = ["1", "1.3", "0.8", "1.15", "0.9"];

type Variant = "flow" | "pulse" | "collide";

const clamp = (count: number) =>
  Math.max(0, Math.min(Math.trunc(count), MAX_BEAMS));

/** Kurva ke-i di kanvas 800x400, menyapu dari kiri atas ke kanan bawah. Bilangan bulat saja. */
function makeCurves(variant: Variant, count: number) {
  const total = clamp(count);
  return Array.from({ length: total }, (_, index) => {
    const shift = Math.floor((index * 640) / Math.max(1, total));
    const bend = (index % 3) * 30;
    return {
      d: `M ${shift - 200} -20 C ${shift} ${120 + bend}, ${shift + 160} ${260 - bend}, ${shift + 620} 420`,
      style:
        variant === "pulse"
          ? {
              opacity: ((index % 4) + 3) / 10,
              animationDelay: `${index * -BEAM_DELAY_MS}ms`,
            }
          : {
              strokeDashoffset: -((index * 37) % 90),
              animationDelay: `${index * -BEAM_DELAY_MS}ms`,
            },
    };
  });
}

/** Berkas vertikal ke-i: posisi, tinggi awal, laju, dan jeda dari rumus supaya tiga framework sama. */
function makeDrops(count: number) {
  const total = clamp(count);
  return Array.from({ length: total }, (_, index) => {
    const left = `${(Math.floor(((2 * index + 1) * 500) / Math.max(1, total)) + ((index * 37) % 11) - 5) / 10}%`;
    const timing = {
      animationDuration: `calc(var(--markas-beams-duration) * ${RATES[index % RATES.length]})`,
      animationDelay: `${index * -BEAM_DELAY_MS}ms`,
    };
    return {
      drop: { ...timing, left, translate: `0 -${(index * 23) % 80}%` },
      splash: { ...timing, left },
    };
  });
}

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    count?: number;
    speed?: keyof typeof speeds;
    color?: keyof typeof colors;
  }>(),
  { variant: "flow", count: 8, speed: "normal", color: "primary" },
);

const vars = computed(() => ({
  "--markas-beams-duration": speeds[props.speed],
}));
const curves = computed(() =>
  props.variant === "collide" ? [] : makeCurves(props.variant, props.count),
);
const drops = computed(() =>
  props.variant === "collide" ? makeDrops(props.count) : [],
);
</script>

<template>
  <div :class="base" :style="vars">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      v-if="props.variant === 'collide'"
      aria-hidden="true"
      :class="[rainLayer, colors[props.color]]"
    >
      <span :class="floor" />
      <span v-for="(item, index) in drops" :key="index">
        <span :class="drop" :style="item.drop" />
        <span :class="splash" :style="item.splash" />
      </span>
    </div>
    <svg
      v-else
      aria-hidden="true"
      :class="[layer, colors[props.color]]"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
    >
      <g v-for="(item, index) in curves" :key="index">
        <path :class="track" :d="item.d" stroke-width="1" />
        <path
          :class="beams[props.variant === 'pulse' ? 'pulse' : 'flow']"
          :d="item.d"
          stroke-width="2"
          pathLength="100"
          :stroke-dasharray="props.variant === 'flow' ? '14 186' : undefined"
          :style="item.style"
        />
      </g>
    </svg>
    <div :class="content"><slot /></div>
  </div>
</template>
