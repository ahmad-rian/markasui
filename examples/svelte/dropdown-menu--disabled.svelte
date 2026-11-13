<script lang="ts">
  import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.svelte";

  const items = [
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { separator: true as const },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste", disabled: true },
  ];
</script>

<div class="flex justify-center">
  <DropdownMenu label="Edit" {items} />
</div>
