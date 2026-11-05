<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]";
const ring =
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[markas-ripple_3.4s_ease-in-out_infinite] rounded-full border border-current bg-current/5 motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const keyframes =
  "@keyframes markas-ripple{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}";
const RING_DELAY_MS = 120;
const MAX_RINGS = 12;

/** Lingkaran ke-i: makin luar makin besar dan makin pudar, dengan jeda supaya denyut merambat dari tengah. */
function makeRings(rings: number, size: number, gap: number) {
  const total = Math.max(0, Math.min(Math.trunc(rings), MAX_RINGS));
  return Array.from({ length: total }, (_, index) => ({
    width: `${size + index * gap}px`,
    height: `${size + index * gap}px`,
    opacity: Math.max(1, 6 - index) / 10,
    animationDelay: `${index * RING_DELAY_MS}ms`,
  }));
}

const props = withDefaults(
  defineProps<{
    rings?: number;
    size?: number;
    gap?: number;
    color?: keyof typeof colors;
  }>(),
  { rings: 6, size: 120, gap: 64, color: "muted" },
);

const ringStyles = computed(() =>
  makeRings(props.rings, props.size, props.gap),
);
</script>

<template>
  <div :class="base">
    <component :is="'style'">{{ keyframes }}</component>
    <div aria-hidden="true" :class="[layer, colors[props.color]]">
      <span
        v-for="(style, index) in ringStyles"
        :key="index"
        :class="ring"
        :style="style"
      />
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
