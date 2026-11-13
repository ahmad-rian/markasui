<script lang="ts">
  import ContextMenu from "../../components/context-menu/ContextMenu.svelte";

  const items = [
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { separator: true as const },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste", disabled: true },
  ];
</script>

<ContextMenu {items}>
  <div
    class="grid gap-2 rounded-lg border border-line bg-surface p-4 text-sm text-ink"
  >
    <p class="font-medium">Meeting notes</p>
    <p class="text-muted">
      Launch moves to Monday. Design review on Thursday, bring the updated
      mockups.
    </p>
  </div>
</ContextMenu>
