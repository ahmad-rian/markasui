<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const cards =
  "*:*:rounded-lg *:*:border *:*:border-line *:*:bg-surface *:*:p-4 *:*:transition-colors *:*:duration-150 *:*:ease-out *:*:has-checked:border-primary *:*:has-checked:bg-primary-soft *:*:motion-reduce:transition-none";
const plans = [
  {
    value: "starter",
    label: "Starter",
    description: "1 project and 2 GB storage. Free forever.",
  },
  {
    value: "team",
    label: "Team",
    description: "Unlimited projects and 100 GB storage. $29 per month.",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "SSO, audit logs, and a dedicated manager.",
  },
];
const plan = ref("team");
</script>

<template>
  <RadioGroup
    v-model="plan"
    name="plan"
    label="Plan"
    :class="cards"
    :options="plans"
  />
</template>
