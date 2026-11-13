<script lang="ts">
  import Badge from "../../components/badge/Badge.svelte";
  import Button from "../../components/button/Button.svelte";
  import ExpandableCard from "../../components/expandable-card/ExpandableCard.svelte";

  const grid = "grid grid-cols-2 gap-3";
  const chart =
    "flex h-full items-end justify-center gap-2 bg-subtle px-4 pt-10 pb-4";
  const bar = "w-4 rounded-sm bg-primary/70";
  const stats = "grid grid-cols-2 gap-2 text-muted";
  const stat = "block text-base font-semibold text-ink";

  const projects = [
    {
      name: "Mobile app redesign",
      summary: "New navigation and onboarding for iOS and Android.",
      status: "On track",
      variant: "success" as const,
      bars: ["h-1/3", "h-1/2", "h-2/3", "h-3/4", "h-5/6"],
      tasks: "42 of 58",
      due: "Dec 12",
    },
    {
      name: "Billing migration",
      summary: "Move every workspace to the new invoicing provider.",
      status: "At risk",
      variant: "warning" as const,
      bars: ["h-1/2", "h-1/3", "h-1/2", "h-1/4", "h-1/3"],
      tasks: "17 of 40",
      due: "Nov 28",
    },
  ];
</script>

<div class={grid}>
  {#each projects as project (project.name)}
    <ExpandableCard
      title={project.name}
      description={project.summary}
      closeLabel="Close project"
    >
      {#snippet media()}
        <span class={chart}>
          {#each project.bars as height, index (index)}
            <span class={`${bar} ${height}`}></span>
          {/each}
        </span>
      {/snippet}
      {#snippet footer()}
        <Button variant="secondary">Share</Button>
        <Button>Open board</Button>
      {/snippet}
      <div>
        <Badge variant={project.variant}>{project.status}</Badge>
      </div>
      <div class={stats}>
        <p><span class={stat}>{project.tasks}</span>tasks done</p>
        <p><span class={stat}>{project.due}</span>due date</p>
      </div>
    </ExpandableCard>
  {/each}
</div>
