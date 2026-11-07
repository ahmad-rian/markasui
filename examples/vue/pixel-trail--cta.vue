<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import PixelTrail from "../../components/pixel-trail/PixelTrail.vue";

const card = "grid gap-4 rounded-xl border border-line bg-subtle p-6";
const title = "text-xl font-semibold text-ink";
const text = "mt-1 text-sm text-muted";
const actions = "flex flex-wrap gap-3";
</script>

<template>
  <PixelTrail
    variant="dot"
    color="success"
    :cell-size="16"
    :fade="900"
    :class="card"
  >
    <div>
      <h3 :class="title">Join 4,000 teams across Indonesia</h3>
      <p :class="text">Free for 14 days, then from Rp 49.000 a month.</p>
    </div>
    <div :class="actions">
      <Button>Start free trial</Button>
      <Button variant="secondary">Talk to sales</Button>
    </div>
  </PixelTrail>
</template>
