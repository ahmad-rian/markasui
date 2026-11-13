<script lang="ts">
  import Checkbox from "../../components/checkbox/Checkbox.svelte";
</script>

<fieldset class="min-w-0">
  <legend class="mb-3 text-sm font-medium text-ink">Notify me by</legend>
  <div class="flex flex-wrap gap-x-6 gap-y-3">
    <Checkbox name="channels[]" value="email" label="Email" checked />
    <Checkbox name="channels[]" value="sms" label="SMS" />
    <Checkbox name="channels[]" value="push" label="Push" checked />
    <Checkbox name="channels[]" value="slack" label="Slack" />
  </div>
</fieldset>
