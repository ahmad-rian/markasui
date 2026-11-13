<script lang="ts">
  import Checkbox from "../../components/checkbox/Checkbox.svelte";
</script>

<div class="grid gap-4">
  <Checkbox name="line_numbers" label="Show line numbers" />
  <Checkbox name="wrap" label="Wrap long lines" checked />
  <Checkbox name="format" label="Format on save" disabled />
  <Checkbox name="autosave" label="Auto save" checked disabled />
  <p class="text-sm text-muted">
    Editor defaults are managed by your organization.
  </p>
</div>
