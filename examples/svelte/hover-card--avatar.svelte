<script lang="ts">
  import Avatar from "../../components/avatar/Avatar.svelte";
  import HoverCard from "../../components/hover-card/HoverCard.svelte";

  const link =
    "inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
</script>

<div class="flex items-center justify-center gap-3 py-6">
  <HoverCard>
    <a href="https://github.com/dewilestari" class={link}>
      <Avatar name="Dewi Lestari" />
    </a>
    {#snippet content()}
      <div class="grid gap-1">
        <p class="font-medium text-ink">Dewi Lestari</p>
        <p class="text-muted">
          Product designer. Leads the design system team.
        </p>
      </div>
    {/snippet}
  </HoverCard>
  <HoverCard>
    <a href="https://github.com/budisantoso" class={link}>
      <Avatar name="Budi Santoso" />
    </a>
    {#snippet content()}
      <div class="grid gap-1">
        <p class="font-medium text-ink">Budi Santoso</p>
        <p class="text-muted">
          Backend engineer. Maintains the registry and CLI.
        </p>
      </div>
    {/snippet}
  </HoverCard>
</div>
