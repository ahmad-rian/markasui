<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const schedules = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const payout = ref("weekly");
</script>

<template>
  <div class="grid gap-3">
    <RadioGroup
      v-model="payout"
      name="payout"
      label="Payout schedule"
      disabled
      :options="schedules"
    />
    <p class="text-sm text-muted">
      Verify your bank account to change the payout schedule.
    </p>
  </div>
</template>
