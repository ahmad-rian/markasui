<script setup lang="ts">
import Carousel from "../../components/carousel/Carousel.vue";

const quotes = [
  {
    text: "We moved our whole team over in a weekend. Planning meetings are half as long now.",
    name: "Dewi Lestari",
    role: "Head of Product, Lumen",
  },
  {
    text: "The weekly dashboard replaced three spreadsheets and a lot of status pings.",
    name: "Budi Santoso",
    role: "Engineering Manager, Arka",
  },
  {
    text: "Simple enough for new hires, flexible enough for our client projects.",
    name: "Siti Aminah",
    role: "Founder, Studio Rana",
  },
];
</script>

<template>
  <Carousel label="Customer stories" show-dots>
    <figure
      v-for="quote in quotes"
      :key="quote.name"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <blockquote class="text-base text-ink">{{ quote.text }}</blockquote>
      <figcaption class="mt-4 text-sm">
        <span class="font-medium text-ink">{{ quote.name }}</span>
        <span class="block text-muted">{{ quote.role }}</span>
      </figcaption>
    </figure>
  </Carousel>
</template>
