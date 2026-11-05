<script setup lang="ts">
import Progress from "../../components/progress/Progress.vue";
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-2">
      <Progress :value="40" aria-label="Checkout progress" />
      <p class="text-sm text-muted">Step 2 of 5: Shipping address</p>
    </div>
    <div class="grid gap-2">
      <Progress :value="90" aria-label="Storage used" />
      <p class="text-sm text-muted">9 GB of 10 GB used</p>
    </div>
  </div>
</template>
