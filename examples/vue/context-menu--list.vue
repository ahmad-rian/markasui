<script setup lang="ts">
import ContextMenu from "../../components/context-menu/ContextMenu.vue";

const rows = [
  { name: "Website redesign", status: "In progress" },
  { name: "Mobile app", status: "Planned" },
];

const items = [
  { label: "Open project", value: "open" },
  { label: "Copy link", value: "copy-link" },
  { separator: true as const },
  { label: "Archive", value: "archive", danger: true },
];
</script>

<template>
  <ul class="grid gap-2">
    <li v-for="row in rows" :key="row.name">
      <ContextMenu :aria-label="row.name" :items="items">
        <div
          class="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-sm"
        >
          <span class="font-medium text-ink">{{ row.name }}</span>
          <span class="text-muted">{{ row.status }}</span>
        </div>
      </ContextMenu>
    </li>
  </ul>
</template>
