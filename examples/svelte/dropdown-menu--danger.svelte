<script lang="ts">
  import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.svelte";

  const items = [
    { label: "Rename", value: "rename" },
    { label: "Transfer ownership", value: "transfer" },
    { separator: true as const },
    { label: "Archive project", value: "archive", danger: true },
    { label: "Delete project", value: "delete", danger: true },
  ];
</script>

<div class="flex justify-center">
  <DropdownMenu label="Project" {items} />
</div>
