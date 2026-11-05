<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
</script>

<template>
  <div class="flex items-center gap-6">
    <span class="relative inline-flex">
      <Avatar name="Budi Santoso" size="lg" />
      <span
        class="absolute right-0 bottom-0 size-3 rounded-full bg-success ring-2 ring-canvas"
        ><span class="sr-only">Online</span></span
      >
    </span>
    <span class="relative inline-flex">
      <Avatar name="Siti Aminah" size="lg" />
      <span
        class="absolute right-0 bottom-0 size-3 rounded-full bg-warning ring-2 ring-canvas"
        ><span class="sr-only">Away</span></span
      >
    </span>
    <span class="relative inline-flex">
      <Avatar name="John Carter" size="lg" />
      <span
        class="absolute right-0 bottom-0 size-3 rounded-full bg-faint ring-2 ring-canvas"
        ><span class="sr-only">Offline</span></span
      >
    </span>
  </div>
</template>
