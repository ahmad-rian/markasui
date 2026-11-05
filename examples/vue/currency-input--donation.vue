<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import CurrencyInput from "../../components/currency-input/CurrencyInput.vue";

const panel = "grid gap-4";
const heading = "grid gap-1";
const title = "text-base font-semibold text-ink";
const text = "text-sm text-muted";

const donation = ref<number | null>(null);
</script>

<template>
  <div :class="panel">
    <div :class="heading">
      <p :class="title">Support the village library</p>
      <p :class="text">Every rupiah goes to new books for 300 students.</p>
    </div>
    <CurrencyInput
      v-model="donation"
      label="Donation amount"
      name="donation"
      placeholder="0"
      :min="5000"
      hint="Minimum Rp5.000"
      :presets="[25000, 50000, 100000, 1500000]"
      presets-label="Suggested donations"
    />
    <Button variant="secondary">Continue to payment</Button>
  </div>
</template>
