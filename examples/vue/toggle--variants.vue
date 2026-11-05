<script setup lang="ts">
import Toggle from "../../components/toggle/Toggle.vue";
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center justify-center gap-2">
      <Toggle>Wrap lines</Toggle>
      <Toggle default-pressed>Show grid</Toggle>
    </div>
    <div class="flex items-center justify-center gap-2">
      <Toggle variant="outline">Subscribe</Toggle>
      <Toggle variant="outline" default-pressed>Following</Toggle>
    </div>
  </div>
</template>
