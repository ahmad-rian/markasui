<script setup lang="ts">
import DragElements from "../../components/drag-elements/DragElements.vue";

const box = "rounded-xl border border-line bg-surface p-5";
const title = "text-sm font-semibold text-ink";
const hint = "text-sm text-muted";
const board = "mt-4 h-44 rounded-lg bg-subtle";
const chip =
  "rounded-full border border-primary-line bg-primary-soft px-3 py-1.5 text-sm font-medium text-ink";
</script>

<template>
  <div :class="box">
    <p :class="title">Stack we love</p>
    <p :class="hint">Pull a tag, it springs back</p>
    <DragElements
      release="return"
      :rotate="12"
      :seed="4"
      :class="board"
      role="group"
      aria-label="Skills"
    >
      <span :class="chip">Laravel</span>
      <span :class="chip">Vue</span>
      <span :class="chip">React</span>
      <span :class="chip">Tailwind CSS</span>
      <span :class="chip">Alpine.js</span>
      <span :class="chip">Figma</span>
    </DragElements>
  </div>
</template>
