<script setup lang="ts">
import TextScramble from "../../components/text-scramble/TextScramble.vue";
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <div class="rounded-xl border border-line bg-surface p-4">
      <p class="text-xs text-muted">Revenue</p>
      <p class="mt-1 text-xl font-semibold text-ink">
        <TextScramble text="Rp 12,4 M" trigger="view" charset="digits" />
      </p>
    </div>
    <div class="rounded-xl border border-line bg-surface p-4">
      <p class="text-xs text-muted">Uptime</p>
      <p class="mt-1 text-xl font-semibold text-ink">
        <TextScramble
          text="99.98%"
          trigger="view"
          charset="digits"
          :delay="150"
        />
      </p>
    </div>
    <div class="rounded-xl border border-line bg-surface p-4">
      <p class="text-xs text-muted">Active teams</p>
      <p class="mt-1 text-xl font-semibold text-ink">
        <TextScramble
          text="1,284"
          trigger="view"
          charset="digits"
          :delay="300"
        />
      </p>
    </div>
  </div>
</template>
