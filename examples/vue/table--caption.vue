<script setup lang="ts">
import Table, { type TableColumn } from "../../components/table/Table.vue";

const columns: TableColumn[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "joined", label: "Joined" },
];
const rows = [
  { name: "Sarah Miller", role: "Owner", joined: "Jan 12, 2025" },
  { name: "Budi Santoso", role: "Editor", joined: "Mar 3, 2025" },
  { name: "Siti Aminah", role: "Viewer", joined: "Aug 21, 2025" },
];
</script>

<template>
  <Table caption="Team members" show-caption :columns="columns" :rows="rows" />
</template>
