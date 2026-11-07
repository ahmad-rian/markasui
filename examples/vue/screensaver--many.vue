<script setup lang="ts">
import Screensaver from "../../components/screensaver/Screensaver.vue";

const card = "rounded-xl border border-line bg-surface p-4";
const head = "flex items-center justify-between text-sm";
const title = "font-semibold text-ink";
const count = "text-muted tabular-nums";
const area = "mt-3 h-52 rounded-lg bg-canvas";
const chip =
  "flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-sm font-medium";
const dot = "size-2.5 rounded-full bg-current";
const name = "text-ink";
</script>

<template>
  <div :class="card">
    <div :class="head">
      <p :class="title">Online now</p>
      <p :class="count">4 people</p>
    </div>
    <Screensaver :speed="60" :seed="3" :class="area">
      <span :class="chip"
        ><span :class="dot"></span><span :class="name">Rania Putri</span></span
      >
      <span :class="chip"
        ><span :class="dot"></span><span :class="name">Bima Saputra</span></span
      >
      <span :class="chip"
        ><span :class="dot"></span><span :class="name">Sekar Ayu</span></span
      >
      <span :class="chip"
        ><span :class="dot"></span
        ><span :class="name">Dimas Pratama</span></span
      >
    </Screensaver>
  </div>
</template>
