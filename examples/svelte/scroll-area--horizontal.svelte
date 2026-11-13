<script lang="ts">
  import ScrollArea from "../../components/scroll-area/ScrollArea.svelte";

  const albums = [
    "Morning light",
    "City nights",
    "Slow mornings",
    "Coastline",
    "Weekend drive",
    "Rain sounds",
  ];
</script>

<ScrollArea label="Recently played" orientation="horizontal">
  <div class="flex gap-3 pb-3">
    {#each albums as album (album)}
      <div class="w-32 shrink-0">
        <div class="h-32 rounded-lg bg-subtle"></div>
        <p class="mt-2 truncate text-sm font-medium text-ink">{album}</p>
      </div>
    {/each}
  </div>
</ScrollArea>
