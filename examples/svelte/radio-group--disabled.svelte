<script lang="ts">
  import RadioGroup from "../../components/radio-group/RadioGroup.svelte";

  const schedules = [
    {
      value: "daily",
      label: "Daily",
    },
    {
      value: "weekly",
      label: "Weekly",
    },
    {
      value: "monthly",
      label: "Monthly",
    },
  ];
</script>

<div class="grid gap-3">
  <RadioGroup
    name="payout"
    label="Payout schedule"
    value="weekly"
    disabled
    options={schedules}
  />
  <p class="text-sm text-muted">
    Verify your bank account to change the payout schedule.
  </p>
</div>
