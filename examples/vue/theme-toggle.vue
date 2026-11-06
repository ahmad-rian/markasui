<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.vue";

/** Plays every toggle there and back without changing the page theme. */
const playAll = () => document.dispatchEvent(new Event("markas-theme-demo"));
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <div class="grid w-full grid-cols-6 gap-2">
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="rotate" variant="outline" size="lg" />
        <span class="text-xs text-muted">Rotate</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="morph" variant="outline" size="lg" />
        <span class="text-xs text-muted">Morph</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="flip" variant="outline" size="lg" />
        <span class="text-xs text-muted">Flip</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="slide" variant="outline" size="lg" />
        <span class="text-xs text-muted">Slide</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="eclipse" variant="outline" size="lg" />
        <span class="text-xs text-muted">Eclipse</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <ThemeToggle animation="spring" variant="outline" size="lg" />
        <span class="text-xs text-muted">Spring</span>
      </div>
    </div>
    <Button variant="secondary" size="sm" @click="playAll">Play all</Button>
  </div>
</template>
