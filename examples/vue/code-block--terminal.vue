<script setup lang="ts">
import CodeBlock from "../../components/code-block/CodeBlock.vue";

const code = [
  "pnpm add markasui",
  "pnpm markasui init",
  "pnpm markasui add carousel",
].join("\n");
</script>

<template>
  <CodeBlock :code="code" title="Terminal" />
</template>
