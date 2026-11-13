<script lang="ts">
  import CodeBlock from "../../components/code-block/CodeBlock.svelte";

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

<CodeBlock {code} title="Counter.tsx" showLineNumbers />
