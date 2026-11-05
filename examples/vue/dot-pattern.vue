<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import DotPattern from "../../components/dot-pattern/DotPattern.vue";
</script>

<template>
  <DotPattern
    mask="radial"
    class="rounded-xl border border-line bg-surface px-6 py-12"
  >
    <div class="grid justify-items-center gap-4 text-center">
      <p
        class="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted"
      >
        Version 2.0 is out
      </p>
      <h2 class="text-2xl font-semibold text-balance text-ink">
        Build interfaces that feel at home
      </h2>
      <p class="max-w-80 text-sm text-muted">
        Copy the components you need into your project and make them yours.
      </p>
      <div class="flex gap-2">
        <Button>Get started</Button>
        <Button variant="secondary">View docs</Button>
      </div>
    </div>
  </DotPattern>
</template>
