<script setup lang="ts">
import { ref } from "vue";
import CurrencyInput from "../../components/currency-input/CurrencyInput.vue";

const stack = "grid gap-5";

const transfer = ref<number | null>(7500000);
const fee = ref<number | null>(2500);
const opening = ref<number | null>(null);
</script>

<template>
  <div :class="stack">
    <CurrencyInput
      v-model="transfer"
      label="Transfer amount"
      error="Amount exceeds your daily limit of Rp5.000.000"
    />
    <CurrencyInput v-model="fee" label="Admin fee" disabled />
    <CurrencyInput v-model="opening" label="Opening balance" placeholder="0" />
  </div>
</template>
