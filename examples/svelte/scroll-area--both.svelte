<script lang="ts">
  import ScrollArea from "../../components/scroll-area/ScrollArea.svelte";

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from(
    { length: 10 },
    (_, i) => `${String(i + 8).padStart(2, "0")}:00`,
  );
</script>

<ScrollArea
  label="Weekly schedule"
  orientation="both"
  class="max-h-60 border border-line bg-surface"
>
  <div class="grid w-[640px] grid-cols-[4rem_repeat(7,1fr)] text-sm">
    <div class="border-b border-line p-2"></div>
    {#each days as day (day)}
      <div class="border-b border-line p-2 font-medium text-ink">{day}</div>
    {/each}
    {#each hours as hour (hour)}
      <div class="contents">
        <div class="p-2 text-muted">{hour}</div>
        {#each days as day (day)}
          <div class="m-1 h-8 rounded-md bg-subtle"></div>
        {/each}
      </div>
    {/each}
  </div>
</ScrollArea>
