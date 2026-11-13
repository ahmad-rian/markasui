<script lang="ts">
  import Tabs from "../../../components/tabs/Tabs.svelte";

  let { onValueChange }: { onValueChange?: (value: string) => void } = $props();
  let active = $state("account");
  const items = [
    { value: "account", label: "Account", content: account },
    { value: "password", label: "Password", content: "Password text" },
    { value: "alerts", label: "Alerts", content: "Alerts text" },
  ];
</script>

{#snippet account()}
  <strong>Account text</strong>
{/snippet}

<Tabs {items} bind:value={active} {onValueChange} class="mt-2" />
<output>{active}</output>
