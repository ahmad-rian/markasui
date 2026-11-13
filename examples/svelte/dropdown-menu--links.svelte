<script lang="ts">
  import DropdownMenu from "../../components/dropdown-menu/DropdownMenu.svelte";

  const items = [
    { label: "Profile", href: "#profile" },
    { label: "Billing", href: "#billing" },
    { label: "Settings", href: "#settings" },
    { separator: true as const },
    { label: "Sign out", value: "sign-out" },
  ];
</script>

<div class="flex justify-center">
  <DropdownMenu label="Account" {items} />
</div>
