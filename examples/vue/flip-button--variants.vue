<script setup lang="ts">
import FlipButton from "../../components/flip-button/FlipButton.vue";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <FlipButton back-label="Let's go">Primary</FlipButton>
    <FlipButton variant="secondary" back-label="Let's go">Secondary</FlipButton>
    <FlipButton variant="ghost" back-label="Let's go">Ghost</FlipButton>
    <FlipButton variant="danger" back-label="Are you sure">Danger</FlipButton>
  </div>
</template>
