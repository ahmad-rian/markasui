<script setup lang="ts">
import Accordion from "../../components/accordion/Accordion.vue";

const items = [
  { value: "shipping", title: "How long does shipping take?" },
  { value: "payment", title: "Which payment methods are available?" },
  { value: "returns", title: "How do I return an item?" },
];
</script>

<template>
  <Accordion :items="items" default-value="shipping">
    <template #shipping>Orders arrive in 2 to 4 business days.</template>
    <template #payment
      >Bank transfer, credit card, and digital wallets.</template
    >
    <template #returns
      >Request a return within 7 days from the order page.</template
    >
  </Accordion>
</template>
