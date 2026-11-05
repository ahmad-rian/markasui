<script setup lang="ts">
import RippleButton from "../../components/ripple-button/RippleButton.vue";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <RippleButton size="sm">Small</RippleButton>
    <RippleButton>Medium</RippleButton>
    <RippleButton size="lg">Large</RippleButton>
  </div>
</template>
