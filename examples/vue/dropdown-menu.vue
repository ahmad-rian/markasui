<script setup lang="ts">
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";

const items = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Archive", value: "archive", disabled: true },
  { separator: true as const },
  { label: "Delete", value: "delete", danger: true },
];
</script>

<template>
  <DropdownMenu label="Actions" :items="items" />
</template>
