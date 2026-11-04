<script setup lang="ts">
import type { Component } from "vue";

const props = defineProps<{ name: string }>();
const examples = import.meta.glob<{ default: Component }>(
  "../../../../../examples/vue/*.vue",
  { eager: true },
);
const example =
  examples[`../../../../../examples/vue/${props.name}.vue`]?.default;
</script>

<template>
  <component :is="example" v-if="example" />
  <p v-else class="text-sm text-danger">
    Contoh Vue untuk {{ props.name }} belum ada.
  </p>
</template>
