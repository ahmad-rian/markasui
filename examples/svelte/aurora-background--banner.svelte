<script lang="ts">
  import AuroraBackground from "../../components/aurora-background/AuroraBackground.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<AuroraBackground
  speed="fast"
  class="rounded-lg border border-line bg-surface px-4 py-3"
>
  <div class="flex items-center justify-between gap-3">
    <p class="text-sm text-ink">
      <span class="font-semibold">New:</span> AI summaries for every meeting
    </p>
    <Button size="sm" variant="secondary">Learn more</Button>
  </div>
</AuroraBackground>
