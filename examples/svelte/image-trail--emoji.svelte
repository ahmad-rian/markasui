<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import ImageTrail from "../../components/image-trail/ImageTrail.svelte";

  const area =
    "grid h-72 content-center justify-items-start gap-3 rounded-xl bg-primary-soft p-8";
  const emoji = "block text-4xl";
  const foods = ["🍜", "🍢", "🌶️", "🥥", "🍌"];
  const eyebrow = "text-sm font-medium text-primary";
  const title = "max-w-64 text-2xl font-semibold text-ink";
  const hint = "text-sm text-muted";
</script>

<ImageTrail variant="scale" threshold={32} class={area}>
  {#snippet items()}
    {#each foods as food (food)}<span class={emoji}>{food}</span>{/each}
  {/snippet}
  <p class={eyebrow}>Jl. Braga, Bandung</p>
  <h3 class={title}>Weekend street food market</h3>
  <p class={hint}>40 stalls, Saturday and Sunday from 4 pm</p>
  <Button>See the stalls</Button>
</ImageTrail>
