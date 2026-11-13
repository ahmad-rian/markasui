<script lang="ts">
  import Breadcrumb from "../../components/breadcrumb/Breadcrumb.svelte";

  const items = [
    { label: "markasui", href: "/" },
    { label: "components", href: "/components" },
    { label: "tabs", href: "/components/tabs" },
    { label: "Tabs.tsx" },
  ];
</script>

<div class="rounded-lg border border-line bg-subtle px-3 py-2">
  <Breadcrumb navLabel="File path" {items} />
</div>
