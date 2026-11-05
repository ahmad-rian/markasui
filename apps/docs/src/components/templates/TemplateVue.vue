<script setup lang="ts">
import type { Component } from "vue";

const props = defineProps<{ name: string }>();
const templates = import.meta.glob<{ default: Component }>(
  "../../../../../templates/*/vue/*.vue",
  { eager: true },
);
const template = Object.entries(templates).find(([path]) =>
  path.includes(`/templates/${props.name}/vue/`),
)?.[1].default;
</script>

<template>
  <component :is="template" v-if="template" />
</template>
