<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import RetroGrid from "../../components/retro-grid/RetroGrid.svelte";
</script>

<RetroGrid class="rounded-xl border border-line bg-surface px-6 py-16">
  <div class="grid justify-items-center gap-4 text-center">
    <h2 class="text-4xl font-bold tracking-tight text-ink">Ship the future</h2>
    <p class="max-w-72 text-sm text-muted">
      A launch platform for teams who move fast and like it that way.
    </p>
    <Button>Join the beta</Button>
  </div>
</RetroGrid>
