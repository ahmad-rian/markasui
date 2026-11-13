<script lang="ts">
  import Accordion from "../../components/accordion/Accordion.svelte";
  import Button from "../../components/button/Button.svelte";

  const items = [
    { value: "pro", title: "What is included in the Pro plan?", content: pro },
    {
      value: "upgrade",
      title: "How do I upgrade?",
      content: "Open the billing page and choose a new plan.",
    },
  ];
</script>

{#snippet pro()}
  <div class="grid gap-3">
    <ul class="grid list-disc gap-1 pl-5">
      <li>Up to 10 team members</li>
      <li>50 GB of storage</li>
      <li>Priority email support</li>
    </ul>
    <div>
      <Button variant="secondary" size="sm">Compare plans</Button>
    </div>
  </div>
{/snippet}

<Accordion {items} defaultValue="pro" />
