<script lang="ts">
  import CodeBlock from "../../components/code-block/CodeBlock.svelte";

  const code = [
    "pnpm add markasui",
    "pnpm markasui init",
    "pnpm markasui add carousel",
  ].join("\n");
</script>

<CodeBlock {code} title="Terminal" />
