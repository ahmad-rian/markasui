<script setup lang="ts">
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";

const items = [
  { label: "Document", value: "document" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Folder", value: "folder" },
];
</script>

<template>
  <div class="flex justify-center">
    <DropdownMenu :items="items">
      <template #trigger>
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        New
      </template>
    </DropdownMenu>
  </div>
</template>
