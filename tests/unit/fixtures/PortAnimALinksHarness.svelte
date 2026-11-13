<script lang="ts">
  import LetterSwap from "../../../components/letter-swap/LetterSwap.svelte";
  import ScrollProgress from "../../../components/scroll-progress/ScrollProgress.svelte";

  let { mode = "forward" }: { mode?: "forward" | "pingpong" | "random" } =
    $props();
</script>

<a href="/pricing"><LetterSwap text="Pricing" {mode} direction="down" /></a>
<div data-testid="box">
  <ScrollProgress target="parent" color="success" size="lg" />
</div>
