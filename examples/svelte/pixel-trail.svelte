<script lang="ts">
  import Button from "../../components/button/Button.svelte";
  import PixelTrail from "../../components/pixel-trail/PixelTrail.svelte";

  const hero =
    "grid h-72 content-center justify-items-center gap-3 rounded-xl border border-line bg-surface p-6 text-center";
  const title = "max-w-72 text-2xl font-semibold text-ink";
  const text = "text-sm text-muted";
</script>

<PixelTrail showGrid class={hero}>
  <h3 class={title}>Interfaces that answer the pointer</h3>
  <p class={text}>Move across the grid and leave a trail.</p>
  <Button>Get started</Button>
</PixelTrail>
