<script setup lang="ts">
import TextScramble from "../../components/text-scramble/TextScramble.vue";

const mark = [
  { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
  { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
  {
    points: "421,762 1325,318 1240,611 336,1050",
    className: "fill-success/35",
  },
  { points: "265,1073 1169,629 1084,922 180,1362", className: "fill-ink/25" },
  { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
  {
    points: "347,1135 1251,691 1166,984 262,1424",
    className: "fill-success",
  },
];
</script>

<template>
  <nav
    aria-label="Main"
    class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3 font-mono text-sm text-ink"
  >
    <span class="flex items-center gap-2 font-sans font-semibold"
      ><svg class="size-6 shrink-0" viewBox="0 0 1464 1430" aria-hidden="true">
        <polygon
          v-for="shape in mark"
          :key="shape.points"
          :points="shape.points"
          :class="shape.className"
        /></svg
      >MarkasUI</span
    >
    <div class="flex gap-5">
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="Docs" charset="symbols" :duration="500"
      /></a>
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="Templates" charset="symbols" :duration="500"
      /></a>
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="Blog" charset="symbols" :duration="500"
      /></a>
    </div>
  </nav>
</template>
