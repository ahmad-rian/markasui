<script lang="ts">
  import CodeBlock from "../../components/code-block/CodeBlock.svelte";

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

<CodeBlock {code} />
