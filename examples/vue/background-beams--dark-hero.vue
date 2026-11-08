<script setup lang="ts">
import BackgroundBeams from "../../components/background-beams/BackgroundBeams.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <BackgroundBeams
    color="success"
    :count="12"
    speed="slow"
    class="dark rounded-xl bg-canvas px-6 py-14 text-ink"
  >
    <div class="grid justify-items-center gap-4 text-center">
      <h3 class="text-3xl font-bold tracking-tight text-ink">
        Every signal, one view
      </h3>
      <p class="max-w-72 text-sm text-muted">
        Logs, traces, and alerts flow into a single timeline your team can
        trust.
      </p>
      <div class="flex gap-2">
        <Button>Start monitoring</Button>
        <Button variant="secondary">View demo</Button>
      </div>
    </div>
  </BackgroundBeams>
</template>
