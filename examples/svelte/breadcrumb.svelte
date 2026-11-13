<script lang="ts">
  import Breadcrumb from "../../components/breadcrumb/Breadcrumb.svelte";

  const items = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Breadcrumb" },
  ];
</script>

<Breadcrumb {items} />
