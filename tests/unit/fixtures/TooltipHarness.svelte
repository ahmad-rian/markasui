<script lang="ts">
  import Tooltip from "../../../components/tooltip/Tooltip.svelte";

  let { side }: { side?: "top" | "bottom" } = $props();
</script>

<Tooltip content="Copy link" {side} class="ms-2" data-testid="root">
  <button aria-describedby="other">Copy</button>
</Tooltip>
