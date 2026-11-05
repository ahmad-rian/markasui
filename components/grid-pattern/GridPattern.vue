<script setup lang="ts">
import { computed } from "vue";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-grid-size)_var(--markas-grid-size)]";
const cell =
  "absolute bg-current animate-[markas-grid-cell_4s_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/20",
  primary: "text-primary/15",
  success: "text-success/30",
  warning: "text-warning/30",
  danger: "text-danger/30",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};
const keyframes = "@keyframes markas-grid-cell{50%{opacity:.4}}";
const CELL_DELAY_MS = 800;

/** Posisi satu sel sorotan di dalam garis grid (kolom, baris mulai dari 0). */
const cellStyle = (
  [col, row]: [number, number],
  size: number,
  index: number,
) => ({
  left: `${col * size + 1}px`,
  top: `${row * size + 1}px`,
  width: `${size - 1}px`,
  height: `${size - 1}px`,
  animationDelay: `${index * CELL_DELAY_MS}ms`,
});

const props = withDefaults(
  defineProps<{
    cellSize?: number;
    cells?: [number, number][];
    color?: keyof typeof colors;
    mask?: keyof typeof masks;
  }>(),
  { cellSize: 32, cells: () => [], color: "muted", mask: "none" },
);

const vars = computed(() => ({ "--markas-grid-size": `${props.cellSize}px` }));
</script>

<template>
  <div :class="base" :style="vars">
    <component :is="'style'">{{ keyframes }}</component>
    <div
      aria-hidden="true"
      :class="[layer, colors[props.color], masks[props.mask]]"
    >
      <span
        v-for="(position, index) in props.cells"
        :key="position.join('-')"
        :class="cell"
        :style="cellStyle(position, props.cellSize, index)"
      />
    </div>
    <div :class="content"><slot /></div>
  </div>
</template>
