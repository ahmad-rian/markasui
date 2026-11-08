<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const wave =
  "absolute left-0 w-[200%] animate-[markas-wave_20s_linear_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const variants = {
  ocean: { layer: "blur-[2px]", wave: "-bottom-1 h-1/2" },
  silk: { layer: "blur-[0.5px]", wave: "top-1/4 h-1/2" },
  layered: { layer: "blur-[1px]", wave: "-bottom-1 h-3/4" },
};
const speeds = { slow: 30, normal: 18, fast: 10 };
const keyframes = "@keyframes markas-wave{to{transform:translateX(-50%)}}";

/** Gelombang dari kurva kuadrat berulang: satu periode 600 unit, jadi geser -50% (1200 unit) menyambung mulus. */
const PERIOD = 600;
const VIEW_HEIGHT = 120;
const PHASE_STEP = 110;
const MIN_WAVES = 3;
const MAX_WAVES = 5;

type Variant = keyof typeof variants;

function wavePath(
  baseline: number,
  amplitude: number,
  phase: number,
  filled: boolean,
) {
  const start = -phase;
  const quarter = PERIOD / 4;
  let d = `M${start} ${baseline} Q${start + quarter} ${baseline - 2 * amplitude} ${start + 2 * quarter} ${baseline}`;
  for (
    let x = start + 4 * quarter;
    x <= 2 * PERIOD + 2 * quarter;
    x += 2 * quarter
  )
    d += ` T${x} ${baseline}`;
  return filled ? `${d} V${VIEW_HEIGHT} H${start} Z` : d;
}

/** Garis dasar, tinggi puncak, dan opasitas (persen) gelombang ke-i untuk tiap varian. */
const shapes = {
  ocean: (i: number) => ({
    baseline: 40 + i * 12,
    amplitude: 16 - i * 2,
    opacity: 6 + i * 4,
  }),
  silk: (i: number) => ({
    baseline: 30 + i * 15,
    amplitude: 10 + i * 3,
    opacity: 30 + i * 8,
  }),
  layered: (i: number) => ({
    baseline: 20 + i * 20,
    amplitude: 8 + (i % 2) * 4,
    opacity: 5 + i * 3,
  }),
};

function makeWaves(
  variant: Variant,
  waves: number,
  speed: keyof typeof speeds,
) {
  const total = Math.max(MIN_WAVES, Math.min(Math.trunc(waves), MAX_WAVES));
  return Array.from({ length: total }, (_, i) => {
    const shape = shapes[variant](i);
    const filled = variant !== "silk";
    return {
      d: wavePath(
        shape.baseline,
        shape.amplitude,
        (i * PHASE_STEP) % PERIOD,
        filled,
      ),
      filled,
      style: {
        opacity: shape.opacity / 100,
        animationDuration: `${(speeds[speed] ?? speeds.normal) + (total - 1 - i) * 4}s`,
        animationDirection: i % 2 === 1 ? "reverse" : "normal",
      },
    };
  });
}

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    color?: keyof typeof colors;
    speed?: keyof typeof speeds;
    waves?: number;
  }>(),
  { variant: "ocean", color: "primary", speed: "normal", waves: 4 },
);

const key = computed<Variant>(() =>
  props.variant in variants ? props.variant : "ocean",
);
const items = computed(() => makeWaves(key.value, props.waves, props.speed));
</script>

<template>
  <div :class="base">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      aria-hidden="true"
      :class="[
        layer,
        variants[key].layer,
        colors[props.color] ?? colors.primary,
      ]"
    >
      <svg
        v-for="(item, index) in items"
        :key="index"
        :class="[wave, variants[key].wave]"
        :style="item.style"
        :viewBox="`0 0 1200 ${VIEW_HEIGHT}`"
        preserveAspectRatio="none"
      >
        <path v-if="item.filled" :d="item.d" fill="currentColor" />
        <path
          v-else
          :d="item.d"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
