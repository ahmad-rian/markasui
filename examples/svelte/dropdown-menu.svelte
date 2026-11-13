<script lang="ts">
  import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.svelte";

  const items = [
    { label: "Edit", value: "edit" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Archive", value: "archive", disabled: true },
    { separator: true as const },
    { label: "Delete", value: "delete", danger: true },
  ];
</script>

<DropdownMenu label="Actions" {items} />
