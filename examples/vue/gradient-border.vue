<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import GradientBorder from "../../components/gradient-border/GradientBorder.vue";
</script>

<template>
  <GradientBorder class="mx-auto max-w-80">
    <div class="grid gap-3 p-6">
      <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
      <p class="text-sm text-muted">
        Unlimited projects, priority support, and advanced analytics.
      </p>
      <p class="text-3xl font-bold text-ink">
        $24<span class="text-sm font-normal text-muted"> / month</span>
      </p>
      <Button>Upgrade now</Button>
    </div>
  </GradientBorder>
</template>
