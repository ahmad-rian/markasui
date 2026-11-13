<script lang="ts">
  import Checkbox from "../../components/checkbox/Checkbox.svelte";

  const card =
    "rounded-lg border border-line bg-surface p-4 transition-colors duration-150 ease-out has-checked:border-primary has-checked:bg-primary-soft motion-reduce:transition-none";
</script>

<fieldset class="min-w-0">
  <legend class="mb-3 text-sm font-medium text-ink">Add-ons</legend>
  <div class="grid gap-3">
    <div class={card}>
      <Checkbox
        name="backups"
        label="Daily backups"
        description="Keep 30 days of snapshots. $5 per month."
        checked
      />
    </div>
    <div class={card}>
      <Checkbox
        name="support"
        label="Priority support"
        description="Replies within 4 hours on business days. $20 per month."
      />
    </div>
    <div class={card}>
      <Checkbox
        name="domain"
        label="Custom domain"
        description="Serve your site from your own domain. Free."
        checked
      />
    </div>
  </div>
</fieldset>
