<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const planOptions = [
  { value: "free", label: "Free", description: "For personal projects." },
  {
    value: "pro",
    label: "Pro",
    description: "For small teams of up to 10 people.",
  },
  {
    value: "business",
    label: "Business",
    description: "For organizations with custom needs.",
  },
];
const billingOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];
const plan = ref("pro");
const billing = ref("monthly");
</script>

<template>
  <div class="grid gap-6">
    <RadioGroup
      v-model="plan"
      name="plan"
      label="Subscription plan"
      :options="planOptions"
    />
    <RadioGroup
      v-model="billing"
      name="billing"
      label="Billing cycle"
      orientation="horizontal"
      :options="billingOptions"
    />
  </div>
</template>
