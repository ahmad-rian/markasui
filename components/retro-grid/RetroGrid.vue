<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_60%)]";
const plane = "absolute inset-0 [transform:rotateX(var(--markas-retro-angle))]";
const grid =
  "absolute -top-full -left-[150%] h-[400%] w-[400%] animate-[markas-retro-grid_1s_linear_infinite] bg-[linear-gradient(to_right,currentColor_1px,transparent_0),linear-gradient(to_bottom,currentColor_1px,transparent_0)] [background-size:var(--markas-retro-cell)_var(--markas-retro-cell)] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/40",
  primary: "text-primary/30",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const keyframes =
  "@keyframes markas-retro-grid{from{transform:translateY(calc(var(--markas-retro-cell)*-1))}to{transform:translateY(0)}}";

const props = withDefaults(
  defineProps<{
    cellSize?: number;
    angle?: number;
    color?: keyof typeof colors;
  }>(),
  { cellSize: 60, angle: 65, color: "muted" },
);

const vars = computed(() => ({
  "--markas-retro-cell": `${props.cellSize}px`,
  "--markas-retro-angle": `${props.angle}deg`,
}));
</script>

<template>
  <div :class="base" :style="vars">
    <component :is="'style'">{{ keyframes }}</component>
    <div aria-hidden="true" :class="[layer, colors[props.color]]">
      <div :class="plane">
        <div :class="grid" />
      </div>
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
