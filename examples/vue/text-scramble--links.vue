<script setup lang="ts">
import TextScramble from "../../components/text-scramble/TextScramble.vue";
</script>

<template>
  <nav
    aria-label="Studio"
    class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3 font-mono text-sm text-ink"
  >
    <span class="font-semibold">Studio Senja</span>
    <div class="flex gap-5">
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="Work" charset="symbols" :duration="500"
      /></a>
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="About" charset="symbols" :duration="500"
      /></a>
      <a
        href="#"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        ><TextScramble text="Contact" charset="symbols" :duration="500"
      /></a>
    </div>
  </nav>
</template>
