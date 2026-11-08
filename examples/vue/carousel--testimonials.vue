<script setup lang="ts">
import Carousel from "../../components/carousel/Carousel.vue";

const quotes = [
  {
    text: "We moved our admin panel to MarkasUI in a weekend. Design reviews are half as long now.",
    name: "Dewi Lestari",
    role: "Head of Product, Jakarta",
  },
  {
    text: "One set of tokens for Blade and Vue replaced three style guides and a lot of pixel nudging.",
    name: "Budi Santoso",
    role: "Engineering Manager, Bandung",
  },
  {
    text: "Simple enough for client handoffs, flexible enough for every brand I work with.",
    name: "Siti Aminah",
    role: "Freelance developer, Yogyakarta",
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
