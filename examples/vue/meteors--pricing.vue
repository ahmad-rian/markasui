<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Meteors from "../../components/meteors/Meteors.vue";
</script>

<template>
  <Meteors
    variant="comet"
    color="warning"
    speed="slow"
    :seed="12"
    class="mx-auto max-w-80 rounded-xl border border-line bg-surface p-6"
  >
    <div class="grid gap-4">
      <div class="grid gap-1">
        <h3 class="text-base font-semibold text-ink">Pro</h3>
        <p class="text-sm text-muted">For teams shipping every day.</p>
      </div>
      <p class="text-ink">
        <span class="text-4xl font-semibold tracking-tight">$24</span>
        <span class="text-sm text-muted"> per seat, monthly</span>
      </p>
      <ul class="grid gap-2 text-sm text-ink">
        <li>Unlimited projects</li>
        <li>Preview deploys for every branch</li>
        <li>Priority support</li>
      </ul>
      <Button>Upgrade to Pro</Button>
    </div>
  </Meteors>
</template>
