<script lang="ts">
  import type { Component } from "svelte";

  let { name }: { name: string } = $props();

  const templates = import.meta.glob<{ default: Component }>(
    "../../../../../templates/*/svelte/*.svelte",
    { eager: true },
  );
  /** Template versi Svelte sebagai island halaman demo. */
  const Template = $derived(
    Object.entries(templates).find(([path]) =>
      path.includes(`/templates/${name}/svelte/`),
    )?.[1].default,
  );
</script>

{#if Template}
  <Template />
{/if}
