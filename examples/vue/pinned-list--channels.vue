<script setup lang="ts">
import PinnedList from "../../components/pinned-list/PinnedList.vue";

const items = [
  {
    value: "general",
    label: "general",
    description: "Company-wide announcements",
    meta: "128",
    icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  },
  {
    value: "design",
    label: "design-crit",
    description: "Weekly critiques, Thursdays",
    meta: "14",
    icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  },
  {
    value: "launch",
    label: "launch-q4",
    description: "Release checklist and status",
    meta: "36",
    icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  },
  {
    value: "random",
    label: "random",
    description: "Cats, lunch, and memes",
    meta: "9",
    icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
  },
];
</script>

<template>
  <PinnedList :items="items" :default-pinned="['design', 'launch']" />
</template>
