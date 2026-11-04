<script setup lang="ts">
import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.vue";

const items = [
  { label: "Ubah", value: "ubah" },
  { label: "Duplikat", value: "duplikat" },
  { label: "Arsipkan", value: "arsipkan", disabled: true },
  { separator: true as const },
  { label: "Hapus", value: "hapus", danger: true },
];
</script>

<template>
  <DropdownMenu label="Aksi" :items="items" />
</template>
