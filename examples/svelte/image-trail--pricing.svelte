<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import ImageTrail from "../../components/image-trail/ImageTrail.svelte";

  const area =
    "grid h-64 content-center justify-items-center rounded-xl bg-ink p-6 text-center text-canvas";
  const chip =
    "block rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium whitespace-nowrap text-ink";
  const perks = [
    "Rp 49.000",
    "Free for 14 days",
    "Rp 149.000",
    "Cancel anytime",
  ];
  const title = "text-2xl font-semibold";
  const hint = "mt-1 mb-4 text-sm text-canvas/70";
</script>

<ImageTrail
  variant="rotate"
  threshold={48}
  duration={1000}
  autoplay
  class={area}
>
  {#snippet items()}
    {#each perks as perk (perk)}<span class={chip}>{perk}</span>{/each}
  {/snippet}
  <h3 class={title}>Plans from Rp 49.000 a month</h3>
  <p class={hint}>Every plan includes all three frameworks</p>
  <Button>Start free trial</Button>
</ImageTrail>
