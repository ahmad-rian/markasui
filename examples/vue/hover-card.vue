<script setup lang="ts">
import Avatar from "../../components/avatar/Avatar.vue";
import HoverCard from "../../components/hover-card/HoverCard.vue";
</script>

<template>
  <div class="flex justify-center py-6">
    <HoverCard>
      <a
        href="https://github.com/markasui"
        class="rounded-sm text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >@markasui</a
      >
      <template #content>
        <div class="flex gap-3">
          <Avatar name="Markas UI" />
          <div class="grid gap-1">
            <p class="font-medium text-ink">Markas UI</p>
            <p class="text-muted">UI components for Blade, React, and Vue.</p>
            <p class="text-xs text-muted">Joined March 2026</p>
          </div>
        </div>
      </template>
    </HoverCard>
  </div>
</template>
