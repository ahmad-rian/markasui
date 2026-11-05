<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_var(--markas-dot-size),transparent_calc(var(--markas-dot-size)_+_0.5px))] [background-size:var(--markas-dot-spacing)_var(--markas-dot-spacing)]";
const content = "relative";
const colors = {
  muted: "text-muted/50",
  primary: "text-primary/40",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};

const props = withDefaults(
  defineProps<{
    spacing?: number;
    dotSize?: number;
    color?: keyof typeof colors;
    mask?: keyof typeof masks;
  }>(),
  { spacing: 16, dotSize: 1, color: "muted", mask: "none" },
);

const vars = computed(() => ({
  "--markas-dot-spacing": `${props.spacing}px`,
  "--markas-dot-size": `${props.dotSize}px`,
}));
</script>

<template>
  <div :class="base" :style="vars">
    <div
      aria-hidden="true"
      :class="[layer, colors[props.color], masks[props.mask]]"
    />
    <div :class="content"><slot /></div>
  </div>
</template>
