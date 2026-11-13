<script lang="ts">
  import Menubar from "../../components/menubar/Menubar.svelte";

  const menus = [
    {
      label: "File",
      items: [
        {
          label: "New document",
          value: "new",
        },
        {
          label: "Save",
          value: "save",
        },
        {
          label: "Export as PDF",
          value: "pdf",
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          value: "undo",
        },
        {
          label: "Redo",
          value: "redo",
        },
        {
          separator: true as const,
        },
        {
          label: "Find and replace",
          value: "find",
        },
      ],
    },
    {
      label: "Insert",
      items: [
        {
          label: "Image",
          value: "image",
        },
        {
          label: "Table",
          value: "table",
        },
        {
          label: "Link",
          value: "link",
        },
      ],
    },
    {
      label: "Format",
      items: [
        {
          label: "Bold",
          value: "bold",
        },
        {
          label: "Italic",
          value: "italic",
        },
        {
          label: "Clear formatting",
          value: "clear",
        },
      ],
    },
  ];
</script>

<div class="overflow-hidden rounded-xl border border-line bg-surface">
  <div
    class="flex items-center justify-between gap-3 border-b border-line bg-canvas px-3 py-2"
  >
    <Menubar label="Editor" {menus} />
    <span class="text-sm text-muted">notes.md</span>
  </div>
  <div class="space-y-2 p-4 text-sm text-ink">
    <p class="font-medium">Version 2.4</p>
    <p class="text-muted">
      Faster search, a new export dialog, and dark mode for the editor.
    </p>
  </div>
</div>
