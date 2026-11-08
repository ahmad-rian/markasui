<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Meteors from "../../components/meteors/Meteors.vue";
</script>

<template>
  <Meteors
    :count="30"
    :angle="60"
    color="muted"
    :seed="8"
    class="dark rounded-xl border border-line bg-canvas px-6 py-12"
  >
    <div class="grid justify-items-center gap-3 text-center">
      <p class="text-6xl font-bold tracking-tight text-ink">404</p>
      <h3 class="text-lg font-semibold text-ink">Lost somewhere in orbit</h3>
      <p class="max-w-72 text-sm text-muted">
        We could not find that page. Try the dashboard or search the docs.
      </p>
      <Button>Back to dashboard</Button>
    </div>
  </Meteors>
</template>
