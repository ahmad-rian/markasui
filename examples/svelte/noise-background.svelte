<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import NoiseBackground from "../../components/noise-background/NoiseBackground.svelte";
</script>

<NoiseBackground
  color="warning"
  class="rounded-xl border border-line bg-surface px-6 py-14"
>
  <div class="grid gap-4">
    <h2 class="text-3xl font-semibold tracking-tight text-balance text-ink">
      Design tools with a little texture
    </h2>
    <p class="max-w-80 text-sm text-muted">
      Brushes, grain, and paper that make digital work feel made by hand.
    </p>
    <div class="flex gap-2">
      <Button>Download the kit</Button>
      <Button variant="ghost">Browse samples</Button>
    </div>
  </div>
</NoiseBackground>
