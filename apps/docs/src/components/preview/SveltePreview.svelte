<script lang="ts">
  import type { Component } from "svelte";

  let { name }: { name: string } = $props();

  const examples = import.meta.glob<{ default: Component }>(
    "../../../../../examples/svelte/*.svelte",
    { eager: true },
  );
  const Example = $derived(
    examples[`../../../../../examples/svelte/${name}.svelte`]?.default,
  );
</script>

{#if Example}
  <Example />
{/if}
