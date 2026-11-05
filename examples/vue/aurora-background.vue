<script setup lang="ts">
import AuroraBackground from "../../components/aurora-background/AuroraBackground.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <AuroraBackground class="rounded-xl border border-line bg-surface px-6 py-14">
    <div class="grid justify-items-center gap-4 text-center">
      <h2 class="text-2xl font-semibold text-balance text-ink">
        Meet your calmer workspace
      </h2>
      <p class="max-w-80 text-sm text-muted">
        Notes, tasks, and docs in one quiet place, synced across every device.
      </p>
      <div class="flex gap-2">
        <Button>Try it free</Button>
        <Button variant="ghost">See how it works</Button>
      </div>
    </div>
  </AuroraBackground>
</template>
