<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import RippleBackground from "../../components/ripple-background/RippleBackground.vue";
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line bg-canvas">
    <RippleBackground
      color="primary"
      :rings="5"
      :size="104"
      :gap="56"
      class="grid h-56 place-items-center"
    >
      <span
        class="grid size-20 place-items-center rounded-full border border-line bg-surface text-xl font-semibold text-ink"
        >MC</span
      >
    </RippleBackground>
    <div class="grid justify-items-center gap-4 px-6 pb-8 text-center">
      <div class="grid gap-1">
        <h3 class="text-base font-semibold text-ink">Calling Maya Chen</h3>
        <p class="text-sm text-muted">Ringing on desktop and mobile</p>
      </div>
      <Button variant="danger">End call</Button>
    </div>
  </div>
</template>
