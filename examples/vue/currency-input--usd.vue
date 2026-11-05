<script setup lang="ts">
import { ref } from "vue";
import CurrencyInput from "../../components/currency-input/CurrencyInput.vue";

const budget = ref<number | null>(1250.5);
</script>

<template>
  <CurrencyInput
    v-model="budget"
    label="Monthly budget"
    name="budget"
    currency="USD"
    hint="Billed in US dollars at the end of each month"
    :presets="[100, 500, 1000, 5000]"
    presets-label="Suggested budgets"
  />
</template>
