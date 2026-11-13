<script lang="ts">
  import Breadcrumb from "../../components/breadcrumb/Breadcrumb.svelte";

  const items = [
    { label: "Home", href: "/" },
    { label: "Store", href: "/store" },
    { label: "Electronics", href: "/store/electronics" },
    { label: "Audio", href: "/store/electronics/audio" },
    { label: "Headphones", href: "/store/electronics/audio/headphones" },
    { label: "Wireless", href: "/store/electronics/audio/headphones/wireless" },
    { label: "Studio Pro X" },
  ];
</script>

<Breadcrumb {items} />
