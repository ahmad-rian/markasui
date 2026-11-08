<script setup lang="ts">
import BackgroundBoxes from "../../components/background-boxes/BackgroundBoxes.vue";
</script>

<template>
  <BackgroundBoxes
    variant="flat"
    color="success"
    :rows="8"
    :cols="14"
    :size="36"
    class="rounded-xl border border-line bg-canvas p-6"
  >
    <div class="grid gap-4">
      <h3 class="text-2xl font-semibold text-ink">Everything in its place</h3>
      <ul class="grid grid-cols-2 gap-3">
        <li class="rounded-lg border border-line bg-surface p-3">
          <p class="text-sm font-semibold text-ink">Boards</p>
          <p class="text-xs text-muted">Plan work in columns.</p>
        </li>
        <li class="rounded-lg border border-line bg-surface p-3">
          <p class="text-sm font-semibold text-ink">Docs</p>
          <p class="text-xs text-muted">Write specs next to tasks.</p>
        </li>
        <li class="rounded-lg border border-line bg-surface p-3">
          <p class="text-sm font-semibold text-ink">Goals</p>
          <p class="text-xs text-muted">Track progress weekly.</p>
        </li>
        <li class="rounded-lg border border-line bg-surface p-3">
          <p class="text-sm font-semibold text-ink">Reports</p>
          <p class="text-xs text-muted">Share wins with one link.</p>
        </li>
      </ul>
    </div>
  </BackgroundBoxes>
</template>
