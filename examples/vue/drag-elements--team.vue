<script setup lang="ts">
import DragElements from "../../components/drag-elements/DragElements.vue";

const board = "h-80 rounded-xl border border-line bg-canvas";
const card =
  "flex w-48 items-center gap-3 rounded-xl border border-line bg-surface p-3";
const avatar =
  "grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
const name = "block text-sm font-semibold text-ink";
const role = "block text-xs text-muted";
</script>

<template>
  <DragElements
    release="stay"
    :rotate="0"
    :class="board"
    role="group"
    aria-label="Team"
  >
    <div data-x="8" data-y="10" data-rotate="-3" :class="card">
      <span aria-hidden="true" :class="avatar">RP</span>
      <span
        ><span :class="name">Rania Putri</span
        ><span :class="role">Design lead</span></span
      >
    </div>
    <div data-x="92" data-y="30" data-rotate="2" :class="card">
      <span aria-hidden="true" :class="avatar">BS</span>
      <span
        ><span :class="name">Bima Saputra</span
        ><span :class="role">Engineering</span></span
      >
    </div>
    <div data-x="12" data-y="70" data-rotate="2" :class="card">
      <span aria-hidden="true" :class="avatar">SA</span>
      <span
        ><span :class="name">Sekar Ayu</span
        ><span :class="role">Product</span></span
      >
    </div>
    <div data-x="88" data-y="92" data-rotate="-2" :class="card">
      <span aria-hidden="true" :class="avatar">DP</span>
      <span
        ><span :class="name">Dimas Pratama</span
        ><span :class="role">Research</span></span
      >
    </div>
  </DragElements>
</template>
