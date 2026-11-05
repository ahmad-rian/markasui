<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Command from "../../components/command/Command.vue";

const items = [
  {
    group: "Documentation",
    label: "Getting started",
    href: "#getting-started",
  },
  { group: "Documentation", label: "Installation", href: "#installation" },
  { group: "Documentation", label: "Theming", href: "#theming" },
  { group: "Components", label: "Button", href: "#button" },
  { group: "Components", label: "Modal", href: "#modal" },
];
</script>

<template>
  <Command :items="items">
    <template #trigger>
      <Button variant="ghost">Search documentation</Button>
    </template>
  </Command>
</template>
