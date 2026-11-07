<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ImageTrail from "../../components/image-trail/ImageTrail.vue";

const area =
  "grid h-72 content-center justify-items-start gap-3 rounded-xl bg-primary-soft p-8";
const emoji = "block text-4xl";
const foods = ["🍜", "🍢", "🌶️", "🥥", "🍌"];
const eyebrow = "text-sm font-medium text-primary";
const title = "max-w-64 text-2xl font-semibold text-ink";
const hint = "text-sm text-muted";
</script>

<template>
  <ImageTrail variant="scale" :threshold="32" :class="area">
    <template #items>
      <span v-for="food in foods" :key="food" :class="emoji">{{ food }}</span>
    </template>
    <p :class="eyebrow">Jl. Braga, Bandung</p>
    <h3 :class="title">Weekend street food market</h3>
    <p :class="hint">40 stalls, Saturday and Sunday from 4 pm</p>
    <Button>See the stalls</Button>
  </ImageTrail>
</template>
