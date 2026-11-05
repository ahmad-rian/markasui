<script setup lang="ts">
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";

const items = [
  { label: "markasui", href: "/" },
  { label: "components", href: "/components" },
  { label: "tabs", href: "/components/tabs" },
  { label: "Tabs.tsx" },
];
</script>

<template>
  <div class="rounded-lg border border-line bg-subtle px-3 py-2">
    <Breadcrumb nav-label="File path" :items="items" />
  </div>
</template>
