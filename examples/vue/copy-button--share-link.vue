<script setup lang="ts">
import CopyButton from "../../components/copy-button/CopyButton.vue";
</script>

<template>
  <div class="grid gap-4 rounded-xl border border-line bg-surface p-6">
    <div class="grid gap-1">
      <p class="text-base font-semibold text-ink">Share this board</p>
      <p class="text-sm text-muted">
        Anyone with the link can view. Only members can edit.
      </p>
    </div>
    <div
      class="flex items-center gap-3 rounded-lg bg-subtle py-1.5 pr-1.5 pl-3"
    >
      <span class="min-w-0 flex-1 truncate text-sm text-ink"
        >https://markasui.com/b/roadmap-q3</span
      >
      <CopyButton text="https://markasui.com/b/roadmap-q3" size="sm"
        >Copy link</CopyButton
      >
    </div>
  </div>
</template>
