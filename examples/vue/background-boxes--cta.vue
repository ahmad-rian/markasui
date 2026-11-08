<script setup lang="ts">
import BackgroundBoxes from "../../components/background-boxes/BackgroundBoxes.vue";
import Button from "../../components/button/Button.vue";
</script>

<template>
  <BackgroundBoxes
    color="danger"
    :rows="10"
    :cols="16"
    :size="28"
    speed="fast"
    class="rounded-xl border border-line bg-surface p-6"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="grid gap-1">
        <h3 class="text-lg font-semibold text-ink">Black Friday deal</h3>
        <p class="text-sm text-muted">Half off every annual plan.</p>
      </div>
      <Button>Claim offer</Button>
    </div>
  </BackgroundBoxes>
</template>
