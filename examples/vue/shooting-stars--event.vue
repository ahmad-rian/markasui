<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ShootingStars from "../../components/shooting-stars/ShootingStars.vue";
</script>

<template>
  <ShootingStars
    variant="dawn"
    frequency="high"
    trail-color="danger"
    :stars="40"
    :seed="17"
    class="dark rounded-xl border border-line bg-canvas px-6 py-10"
  >
    <div class="grid gap-4">
      <p class="text-sm font-medium text-muted">Live, 14 November, 06:00 UTC</p>
      <h3 class="text-2xl font-semibold text-balance text-ink">
        Sunrise Summit: watch the keynote as it lands
      </h3>
      <p class="max-w-80 text-sm text-muted">
        Four talks, one hour, and a few surprises we have kept quiet all year.
      </p>
      <div class="flex gap-2">
        <Button>Save my spot</Button>
        <Button variant="ghost">Add to calendar</Button>
      </div>
    </div>
  </ShootingStars>
</template>
