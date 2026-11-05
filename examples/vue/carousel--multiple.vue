<script setup lang="ts">
import Carousel from "../../components/carousel/Carousel.vue";

const products = [
  { name: "Desk lamp", price: "$48" },
  { name: "Notebook set", price: "$18" },
  { name: "Wool throw", price: "$64" },
  { name: "Ceramic mug", price: "$14" },
];
</script>

<template>
  <Carousel label="Popular products" :per-view="2">
    <div
      v-for="product in products"
      :key="product.name"
      class="rounded-xl border border-line bg-surface p-4"
    >
      <div class="h-24 rounded-lg bg-subtle" />
      <p class="mt-3 text-sm font-medium text-ink">{{ product.name }}</p>
      <p class="text-sm text-muted">{{ product.price }}</p>
    </div>
  </Carousel>
</template>
