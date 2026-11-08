<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Input from "../../components/input/Input.vue";
import NoiseBackground from "../../components/noise-background/NoiseBackground.vue";
</script>

<template>
  <NoiseBackground
    variant="paper"
    color="muted"
    size="coarse"
    speed="slow"
    class="rounded-xl border border-line bg-canvas px-6 py-10"
  >
    <form class="grid gap-4">
      <div class="grid gap-1">
        <h3 class="text-xl font-semibold text-ink">The Sunday Letter</h3>
        <p class="text-sm text-muted">
          One long read, three links, and no noise. Every Sunday morning.
        </p>
      </div>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button type="submit">Subscribe</Button>
    </form>
  </NoiseBackground>
</template>
