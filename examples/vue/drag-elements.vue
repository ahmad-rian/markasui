<script setup lang="ts">
import DragElements from "../../components/drag-elements/DragElements.vue";

const board = "h-80 rounded-xl border border-line bg-subtle";
const note = "w-44 rounded-lg bg-surface p-4 shadow-overlay";
const noteTitle = "text-sm font-semibold text-ink";
const noteText = "mt-1 text-sm text-muted";
const sticker =
  "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary";
const round =
  "grid size-16 place-items-center rounded-full border-2 border-dashed border-success bg-surface text-sm font-semibold text-ink";
const swatches = "flex gap-1.5 rounded-lg bg-surface p-2 shadow-overlay";
const swatchPrimary = "size-8 rounded-md bg-primary";
const swatchSuccess = "size-8 rounded-md bg-success";
const swatchWarning = "size-8 rounded-md bg-warning";
const tag =
  "rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink";
</script>

<template>
  <DragElements :seed="4" :class="board" role="group" aria-label="Moodboard">
    <div :class="note">
      <p :class="noteTitle">Brand refresh</p>
      <p :class="noteText">Warm, calm, a little playful</p>
    </div>
    <span :class="sticker">Kopi susu</span>
    <span :class="round">New</span>
    <span :class="tag">Batik pattern</span>
    <div :class="swatches" aria-label="Palette" role="img">
      <span :class="swatchPrimary"></span>
      <span :class="swatchSuccess"></span>
      <span :class="swatchWarning"></span>
    </div>
  </DragElements>
</template>
