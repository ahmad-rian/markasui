<script setup lang="ts">
import Carousel from "../../components/carousel/Carousel.vue";

const photos = ["Living room", "Kitchen", "Bedroom", "Garden"];
</script>

<template>
  <Carousel
    label="Apartment photos"
    previous-label="Previous photo"
    next-label="Next photo"
  >
    <div
      v-for="(photo, index) in photos"
      :key="photo"
      class="flex h-48 flex-col items-center justify-center gap-2 rounded-xl bg-subtle text-muted"
    >
      <svg
        class="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-9 9" />
      </svg>
      <p class="text-sm">
        {{ photo }}, photo {{ index + 1 }} of {{ photos.length }}
      </p>
    </div>
  </Carousel>
</template>
