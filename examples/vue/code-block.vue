<script setup lang="ts">
import CodeBlock from "../../components/code-block/CodeBlock.vue";

const code = [
  "export function formatPrice(amount: number) {",
  '  return new Intl.NumberFormat("en-US", {',
  '    style: "currency",',
  '    currency: "USD",',
  "  }).format(amount);",
  "}",
].join("\n");
</script>

<template>
  <CodeBlock :code="code" title="format-price.ts" />
</template>
