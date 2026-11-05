<script setup lang="ts">
import FlipButton from "../../components/flip-button/FlipButton.vue";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <FlipButton back-label="It takes 2 minutes">Create account</FlipButton>
    <FlipButton variant="secondary" back-label="No card needed"
      >Start free trial</FlipButton
    >
  </div>
</template>
