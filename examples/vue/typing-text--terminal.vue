<script setup lang="ts">
import TypingText from "../../components/typing-text/TypingText.vue";
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line bg-surface">
    <div class="flex items-center gap-1.5 border-b border-line px-4 py-3">
      <span class="size-2.5 rounded-full bg-danger" />
      <span class="size-2.5 rounded-full bg-warning" />
      <span class="size-2.5 rounded-full bg-success" />
    </div>
    <p class="p-4 font-mono text-sm text-ink">
      <span class="text-muted">$ </span
      ><TypingText
        :words="['pnpm dlx markasui add marquee']"
        :loop="false"
        :type-speed="50"
      />
    </p>
  </div>
</template>
