<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const star =
  "absolute rounded-full bg-ink animate-[markas-star-blink_3s_ease-in-out_infinite] motion-reduce:animate-none";
const streak =
  "absolute h-px rounded-full bg-linear-to-r from-ink via-current to-transparent [transform:rotate(215deg)] animate-[markas-shooting-star_9s_ease-out_infinite] motion-reduce:animate-none";
const content = "relative";
const trailColors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const variants = {
  night: { glow: "", trail: "primary", sky: 100 },
  dawn: {
    glow: "absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-warning/25 via-danger/5 to-transparent",
    trail: "warning",
    sky: 60,
  },
} as const;
/** Satu putaran animasi dalam milidetik; tiga bintang jatuh berbagi putaran, jadi satu muncul tiap sepertiganya. */
const frequencies = { low: 15000, normal: 9000, high: 4500 };
const keyframes =
  "@keyframes markas-star-blink{50%{opacity:.2}}@keyframes markas-shooting-star{0%{transform:rotate(215deg) translateX(0);opacity:0}2%{opacity:1}14%,to{transform:rotate(215deg) translateX(-360px);opacity:0}}";

/** Park-Miller: hanya operasi bilangan bulat, jadi Blade, React, dan Vue menghasilkan langit yang sama. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_STARS = 300;
const STREAKS = 3;
const JITTER_MS = 1000;

type Variant = keyof typeof variants;

function makeSky(
  variant: Variant,
  count: number,
  seed: number,
  frequency: keyof typeof frequencies,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_STARS));
  const sky = variants[variant].sky;
  const stars = Array.from({ length: total }, () => {
    const size = next() % 6 === 0 ? 2 : 1;
    return {
      left: `${(next() % 10000) / 100}%`,
      top: `${(next() % (sky * 100)) / 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      opacity: ((next() % 6) + 3) / 10,
      animationDelay: `${(next() % 30) * 100}ms`,
      animationDuration: `${(next() % 3) + 2}s`,
    };
  });
  const cycle = frequencies[frequency] ?? frequencies.normal;
  const streaks = Array.from({ length: STREAKS }, (_, i) => ({
    left: `${20 + (next() % 60)}%`,
    top: `${next() % 45}%`,
    width: `${80 + (next() % 60)}px`,
    animationDuration: `${cycle}ms`,
    animationDelay: `${-(((STREAKS - i) % STREAKS) * (cycle / STREAKS) + (next() % JITTER_MS))}ms`,
  }));
  return { stars, streaks };
}

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    frequency?: keyof typeof frequencies;
    trailColor?: keyof typeof trailColors;
    stars?: number;
    seed?: number;
  }>(),
  {
    variant: "night",
    frequency: "normal",
    trailColor: undefined,
    stars: 70,
    seed: 11,
  },
);

const key = computed<Variant>(() =>
  props.variant in variants ? props.variant : "night",
);
const config = computed(() => variants[key.value]);
const sky = computed(() =>
  makeSky(key.value, props.stars, props.seed, props.frequency),
);
const trail = computed(
  () =>
    trailColors[props.trailColor ?? config.value.trail] ?? trailColors.primary,
);
</script>

<template>
  <div :class="base">
    <component :is="'style'">{{ keyframes }}</component>
    <div aria-hidden="true" :class="[layer, trail]">
      <div v-if="config.glow" :class="config.glow" />
      <span
        v-for="(style, index) in sky.stars"
        :key="index"
        :class="star"
        :style="style"
      />
      <span
        v-for="(style, index) in sky.streaks"
        :key="`s${index}`"
        :class="streak"
        :style="style"
      />
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
