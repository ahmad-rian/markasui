<script lang="ts">
  import Accordion from "../../../components/accordion/Accordion.svelte";
</script>

{#snippet rich()}
  <a href="/plans">Compare plans</a>
{/snippet}

<Accordion
  class="px-4"
  defaultValue="pro"
  items={[
    { value: "pro", title: "Pro plan", content: rich },
    { value: "upgrade", title: "Upgrade", content: "Open billing." },
  ]}
/>
