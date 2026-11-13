<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import Command from "../../components/command/Command.svelte";

  const items = [
    {
      group: "Documentation",
      label: "Getting started",
      href: "#getting-started",
    },
    { group: "Documentation", label: "Installation", href: "#installation" },
    { group: "Documentation", label: "Theming", href: "#theming" },
    { group: "Components", label: "Button", href: "#button" },
    { group: "Components", label: "Modal", href: "#modal" },
  ];
</script>

<Command {items}>
  {#snippet trigger()}
    <Button variant="ghost">Search documentation</Button>
  {/snippet}
</Command>
