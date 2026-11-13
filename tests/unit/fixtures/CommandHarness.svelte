<script lang="ts">
  import Button from "../../../components/button/Button.svelte";
  import Command from "../../../components/command/Command.svelte";

  let { onselect }: { onselect?: (value: string) => void } = $props();
  const items = [
    { group: "Suggestions", label: "Calendar", value: "calendar" },
    { group: "Suggestions", label: "Calculator" },
    {
      group: "Settings",
      label: "Billing",
      value: "billing",
      shortcut: "Ctrl+B",
    },
    { group: "Docs", label: "Bad link", href: "javascript:alert(1)" },
  ];
</script>

<Command hotkey {items} searchLabel="Cari" class="max-w-sm" {onselect}>
  {#snippet trigger()}
    <Button>Open command palette</Button>
  {/snippet}
</Command>
