<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Command from "../../components/command/Command.svelte";

  const items = [
    { group: "Suggestions", label: "Calendar", value: "calendar" },
    { group: "Suggestions", label: "Search emoji", value: "emoji" },
    { group: "Suggestions", label: "Calculator", value: "calculator" },
    {
      group: "Settings",
      label: "Profile",
      value: "profile",
      shortcut: "Ctrl+P",
    },
    {
      group: "Settings",
      label: "Billing",
      value: "billing",
      shortcut: "Ctrl+B",
    },
    {
      group: "Settings",
      label: "Settings",
      value: "settings",
      shortcut: "Ctrl+S",
    },
  ];
</script>

<Command hotkey {items}>
  {#snippet trigger()}
    <Button variant="secondary">Open command palette</Button>
  {/snippet}
</Command>
