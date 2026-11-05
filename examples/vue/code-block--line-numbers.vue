<script setup lang="ts">
import CodeBlock from "../../components/code-block/CodeBlock.vue";

const code = [
  'import { useState } from "react";',
  "",
  "export function Counter() {",
  "  const [count, setCount] = useState(0);",
  "  const add = () => setCount(count + 1);",
  "",
  "  return (",
  "    <button onClick={add}>",
  "      Clicked {count} times",
  "    </button>",
  "  );",
  "}",
].join("\n");
</script>

<template>
  <CodeBlock :code="code" title="Counter.tsx" show-line-numbers />
</template>
