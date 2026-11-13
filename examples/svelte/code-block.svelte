<script lang="ts">
  import CodeBlock from "../../components/code-block/CodeBlock.svelte";

  const code = [
    "export function formatPrice(amount: number) {",
    '  return new Intl.NumberFormat("en-US", {',
    '    style: "currency",',
    '    currency: "USD",',
    "  }).format(amount);",
    "}",
  ].join("\n");
</script>

<CodeBlock {code} title="format-price.ts" />
