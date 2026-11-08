<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ShootingStars from "../../components/shooting-stars/ShootingStars.vue";
</script>

<template>
  <ShootingStars
    variant="dawn"
    :stars="50"
    :seed="4"
    class="rounded-xl border border-line bg-surface px-6 pt-10 pb-14"
  >
    <div class="grid justify-items-center gap-4 text-center">
      <h3 class="text-xl font-semibold text-balance text-ink">
        Early access opens at sunrise
      </h3>
      <p class="max-w-72 text-sm text-muted">
        We invite a new group every morning. Leave your email and we will save
        you a seat.
      </p>
      <Button>Notify me</Button>
    </div>
  </ShootingStars>
</template>
