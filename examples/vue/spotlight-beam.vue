<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import SpotlightBeam from "../../components/spotlight-beam/SpotlightBeam.vue";
</script>

<template>
  <SpotlightBeam follow class="dark rounded-xl bg-canvas px-6 py-16 text-ink">
    <div class="grid gap-4">
      <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
        Your roadmap, in the spotlight
      </h2>
      <p class="max-w-80 text-sm text-muted">
        Share what is shipping next with a public roadmap your customers can
        vote on.
      </p>
      <div class="flex gap-2">
        <Button>Create a roadmap</Button>
        <Button variant="ghost">View example</Button>
      </div>
    </div>
  </SpotlightBeam>
</template>
