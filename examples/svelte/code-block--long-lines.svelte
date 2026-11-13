<script lang="ts">
  import CodeBlock from "../../components/code-block/CodeBlock.svelte";

  const code = [
    'curl -X POST https://api.example.com/v1/invoices -H "Authorization: Bearer $API_TOKEN" -d \'{"customer":"cus_1024","amount":25000}\'',
  ].join("\n");
</script>

<CodeBlock {code} title="create-invoice.sh" showLineNumbers />
