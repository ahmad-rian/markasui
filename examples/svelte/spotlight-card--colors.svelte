<script lang="ts">
  import SpotlightCard from "../../components/spotlight-card/SpotlightCard.svelte";
</script>

<div class="grid grid-cols-2 gap-3">
  <SpotlightCard color="success">
    <div class="p-4">
      <p class="flex items-center gap-2 text-sm font-semibold text-ink">
        <span class="size-2 rounded-full bg-success"></span>
        API
      </p>
      <p class="mt-1 text-xs text-muted">Operational, 99.98% uptime</p>
    </div>
  </SpotlightCard>
  <SpotlightCard color="danger">
    <div class="p-4">
      <p class="flex items-center gap-2 text-sm font-semibold text-ink">
        <span class="size-2 rounded-full bg-danger"></span>
        Webhooks
      </p>
      <p class="mt-1 text-xs text-muted">Delayed, fix in progress</p>
    </div>
  </SpotlightCard>
</div>
