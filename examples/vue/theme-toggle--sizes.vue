<script setup lang="ts">
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <ThemeToggle size="sm" variant="ghost" />
      <ThemeToggle size="md" variant="ghost" />
      <ThemeToggle size="lg" variant="ghost" />
    </div>
    <div class="flex items-center gap-3">
      <ThemeToggle size="sm" variant="outline" animation="morph" />
      <ThemeToggle size="md" variant="outline" animation="morph" />
      <ThemeToggle size="lg" variant="outline" animation="morph" />
    </div>
    <div class="flex items-center gap-3">
      <ThemeToggle size="sm" variant="solid" animation="flip" />
      <ThemeToggle size="md" variant="solid" animation="flip" />
      <ThemeToggle size="lg" variant="solid" animation="flip" />
    </div>
  </div>
</template>
