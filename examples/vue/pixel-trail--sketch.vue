<script setup lang="ts">
import PixelTrail from "../../components/pixel-trail/PixelTrail.vue";

const pad =
  "grid h-64 content-end rounded-xl border border-dashed border-line bg-canvas p-4";
const title = "text-sm font-semibold text-ink";
const text = "text-sm text-muted";
</script>

<template>
  <PixelTrail
    variant="brush"
    color="warning"
    :cell-size="12"
    :fade="1500"
    autoplay
    :class="pad"
  >
    <p :class="title">Sketch pad</p>
    <p :class="text">Draw with your cursor. It doodles on its own too.</p>
  </PixelTrail>
</template>
