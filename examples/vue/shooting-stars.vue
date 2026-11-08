<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ShootingStars from "../../components/shooting-stars/ShootingStars.vue";
</script>

<template>
  <ShootingStars class="rounded-xl border border-line bg-surface px-6 py-14">
    <div class="grid justify-items-center gap-4 text-center">
      <p class="text-sm font-medium text-muted">Private beta</p>
      <h2 class="text-2xl font-semibold text-balance text-ink">
        Make a wish, then ship it
      </h2>
      <p class="max-w-80 text-sm text-muted">
        Turn a one line idea into a working preview before your coffee gets
        cold.
      </p>
      <Button>Join the waitlist</Button>
    </div>
  </ShootingStars>
</template>
