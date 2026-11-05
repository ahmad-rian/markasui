<script setup lang="ts">
import FlipButton from "../../components/flip-button/FlipButton.vue";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <FlipButton size="sm" back-label="Free">Small</FlipButton>
    <FlipButton back-label="Free">Medium</FlipButton>
    <FlipButton size="lg" back-label="Free">Large</FlipButton>
  </div>
</template>
