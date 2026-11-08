<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import LampEffect from "../../components/lamp-effect/LampEffect.vue";
</script>

<template>
  <LampEffect class="dark rounded-xl bg-canvas px-6 pt-32 pb-14 text-ink">
    <div class="grid justify-items-center gap-4 text-center">
      <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
        Build in the light
      </h2>
      <p class="max-w-80 text-sm text-muted">
        Plan, ship, and review every release from one bright, focused workspace.
      </p>
      <div class="flex gap-2">
        <Button>Start for free</Button>
        <Button variant="ghost">Book a demo</Button>
      </div>
    </div>
  </LampEffect>
</template>
