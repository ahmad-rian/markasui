<script lang="ts">
  import Tabs from "../../components/tabs/Tabs.svelte";

  const items = [
    { value: "overview", label: "Overview", content: overview },
    {
      value: "traffic",
      label: "Traffic",
      content: "Most visitors arrive from search and newsletters.",
    },
    {
      value: "reports",
      label: "Reports",
      content: "Monthly reports are sent on the first day of each month.",
    },
  ];
</script>

{#snippet overview()}
  <div class="grid grid-cols-3 gap-3">
    <div class="grid gap-1 rounded-lg bg-subtle p-3">
      <span class="text-xs text-muted">Visitors</span>
      <span class="text-lg font-semibold text-ink">12,480</span>
    </div>
    <div class="grid gap-1 rounded-lg bg-subtle p-3">
      <span class="text-xs text-muted">Sign-ups</span>
      <span class="text-lg font-semibold text-ink">342</span>
    </div>
    <div class="grid gap-1 rounded-lg bg-subtle p-3">
      <span class="text-xs text-muted">Conversion</span>
      <span class="text-lg font-semibold text-ink">2.7%</span>
    </div>
  </div>
{/snippet}

<div class="rounded-xl border border-line bg-surface p-4">
  <Tabs {items} defaultValue="overview" />
</div>
