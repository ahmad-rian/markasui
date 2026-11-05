<script setup lang="ts">
import Tabs from "../../components/tabs/Tabs.vue";

const items = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];
</script>

<template>
  <Tabs
    :items="items"
    default-value="monthly"
    class="[&_[role=tab]]:flex-1 [&_[role=tablist]]:flex"
  >
    <template #monthly>
      <div class="grid gap-1">
        <span class="text-2xl font-semibold text-ink">$12 per month</span>
        <span class="text-sm text-muted">Billed monthly. Cancel anytime.</span>
      </div>
    </template>
    <template #yearly>
      <div class="grid gap-1">
        <span class="text-2xl font-semibold text-ink">$120 per year</span>
        <span class="text-sm text-muted"
          >Two months free compared to monthly billing.</span
        >
      </div>
    </template>
  </Tabs>
</template>
