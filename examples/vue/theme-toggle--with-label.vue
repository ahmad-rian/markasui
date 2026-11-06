<script setup lang="ts">
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ThemeToggle
      show-text
      dark-label="Dark mode"
      light-label="Light mode"
      variant="outline"
    />
    <ThemeToggle
      show-text
      dark-label="Dark mode"
      light-label="Light mode"
      variant="solid"
      animation="morph"
      size="sm"
    />
    <ThemeToggle
      show-text
      dark-label="Dark mode"
      light-label="Light mode"
      variant="ghost"
      animation="slide"
      size="lg"
    />
  </div>
</template>
