<script setup lang="ts">
import ScrollArea from "../../components/scroll-area/ScrollArea.vue";

const releases = Array.from({ length: 12 }, (_, i) => `v2.${12 - i}.0`);
</script>

<template>
  <ScrollArea label="Releases" class="max-h-56 border border-line bg-surface">
    <div class="p-4">
      <p class="mb-2 text-sm font-medium text-ink">Releases</p>
      <p
        v-for="release in releases"
        :key="release"
        class="border-t border-line py-2 text-sm text-muted"
      >
        {{ release }}
      </p>
    </div>
  </ScrollArea>
</template>
