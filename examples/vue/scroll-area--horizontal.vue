<script setup lang="ts">
import ScrollArea from "../../components/scroll-area/ScrollArea.vue";

const albums = [
  "Morning light",
  "City nights",
  "Slow mornings",
  "Coastline",
  "Weekend drive",
  "Rain sounds",
];
</script>

<template>
  <ScrollArea label="Recently played" orientation="horizontal">
    <div class="flex gap-3 pb-3">
      <div v-for="album in albums" :key="album" class="w-32 shrink-0">
        <div class="h-32 rounded-lg bg-subtle" />
        <p class="mt-2 truncate text-sm font-medium text-ink">
          {{ album }}
        </p>
      </div>
    </div>
  </ScrollArea>
</template>
