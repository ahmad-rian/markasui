<script lang="ts">
  import Tabs from "../../components/tabs/Tabs.svelte";

  const items = [
    { value: "monthly", label: "Monthly", content: monthly },
    { value: "yearly", label: "Yearly", content: yearly },
  ];
</script>

{#snippet monthly()}
  <div class="grid gap-1">
    <span class="text-2xl font-semibold text-ink">$12 per month</span>
    <span class="text-sm text-muted">Billed monthly. Cancel anytime.</span>
  </div>
{/snippet}

{#snippet yearly()}
  <div class="grid gap-1">
    <span class="text-2xl font-semibold text-ink">$120 per year</span>
    <span class="text-sm text-muted"
      >Two months free compared to monthly billing.</span
    >
  </div>
{/snippet}

<Tabs
  {items}
  defaultValue="monthly"
  class="[&_[role=tab]]:flex-1 [&_[role=tablist]]:flex"
/>
