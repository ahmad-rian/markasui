<script setup lang="ts">
import PinnedList from "../../components/pinned-list/PinnedList.vue";

const items = [
  { value: "jakarta", label: "Jakarta", meta: "31°C" },
  { value: "bandung", label: "Bandung", meta: "24°C" },
  { value: "surabaya", label: "Surabaya", meta: "33°C" },
  { value: "denpasar", label: "Denpasar", meta: "29°C" },
];
</script>

<template>
  <PinnedList :items="items" />
</template>
