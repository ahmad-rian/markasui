<script setup lang="ts">
import Marquee from "../../components/marquee/Marquee.vue";

const stack = ["Laravel", "React", "Vue", "Alpine.js", "Tailwind CSS", "Vite"];
</script>

<template>
  <Marquee>
    <span
      v-for="name in stack"
      :key="name"
      class="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium whitespace-nowrap text-ink"
      >{{ name }}</span
    >
  </Marquee>
</template>
