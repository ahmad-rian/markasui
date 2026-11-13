<script lang="ts">
  import AuroraBackground from "../../components/aurora-background/AuroraBackground.svelte";
  import Button from "../../components/button/Button.svelte";
</script>

<AuroraBackground
  color="warning"
  speed="slow"
  class="rounded-xl border border-line bg-surface p-6"
>
  <div class="grid gap-4">
    <div class="grid gap-1.5">
      <p class="text-sm font-medium text-muted">Pro plan</p>
      <p class="flex items-baseline gap-1">
        <span class="text-4xl font-semibold text-ink">$24</span>
        <span class="text-sm text-muted">per seat / month</span>
      </p>
      <p class="text-sm text-muted">
        Unlimited projects, priority support, and audit logs.
      </p>
    </div>
    <Button class="w-full">Upgrade to Pro</Button>
  </div>
</AuroraBackground>
