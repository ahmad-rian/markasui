<script setup lang="ts">
import CodeBlock from "../../components/code-block/CodeBlock.vue";

const code = [
  "{",
  '  "name": "acme-dashboard",',
  '  "private": true,',
  '  "scripts": {',
  '    "dev": "vite",',
  '    "build": "vite build"',
  "  }",
  "}",
].join("\n");
</script>

<template>
  <CodeBlock :code="code" />
</template>
