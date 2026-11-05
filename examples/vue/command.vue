<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Command from "../../components/command/Command.vue";

const items = [
  { group: "Suggestions", label: "Calendar", value: "calendar" },
  { group: "Suggestions", label: "Search emoji", value: "emoji" },
  { group: "Suggestions", label: "Calculator", value: "calculator" },
  { group: "Settings", label: "Profile", value: "profile", shortcut: "Ctrl+P" },
  { group: "Settings", label: "Billing", value: "billing", shortcut: "Ctrl+B" },
  {
    group: "Settings",
    label: "Settings",
    value: "settings",
    shortcut: "Ctrl+S",
  },
];
</script>

<template>
  <Command hotkey :items="items">
    <template #trigger>
      <Button variant="secondary">Open command palette</Button>
    </template>
  </Command>
</template>
