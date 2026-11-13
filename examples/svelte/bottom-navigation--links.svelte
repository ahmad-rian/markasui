<script lang="ts">
  import BottomNavigation from "../../components/bottom-navigation/BottomNavigation.svelte";

  const items = [
    {
      value: "shop",
      label: "Shop",
      href: "#shop",
      icon: "M3 9h18l-1.5 11a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1zM8 9V7a4 4 0 0 1 8 0v2",
    },
    {
      value: "saved",
      label: "Saved",
      href: "#saved",
      icon: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z",
    },
    {
      value: "orders",
      label: "Orders",
      href: "#orders",
      icon: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
      badge: 2,
    },
    {
      value: "account",
      label: "Account",
      href: "#account",
      icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    },
  ];
</script>

<div
  class="mx-auto grid w-[360px] gap-4 rounded-[2rem] border border-line bg-surface p-4"
>
  <div class="grid gap-1 px-2 pt-2">
    <p class="text-base font-semibold text-ink">Orders</p>
    <p class="text-sm text-muted">2 parcels on the way to Bandung</p>
  </div>
  <BottomNavigation {items} defaultValue="orders" navLabel="Store" />
</div>
