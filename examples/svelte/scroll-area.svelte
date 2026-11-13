<script lang="ts">
  import ScrollArea from "../../components/scroll-area/ScrollArea.svelte";

  const releases = Array.from({ length: 12 }, (_, i) => `v2.${12 - i}.0`);
</script>

<ScrollArea label="Releases" class="max-h-56 border border-line bg-surface">
  <div class="p-4">
    <p class="mb-2 text-sm font-medium text-ink">Releases</p>
    {#each releases as release (release)}
      <p class="border-t border-line py-2 text-sm text-muted">{release}</p>
    {/each}
  </div>
</ScrollArea>
