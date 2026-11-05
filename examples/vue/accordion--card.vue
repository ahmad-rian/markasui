<script setup lang="ts">
import Accordion from "../../components/accordion/Accordion.vue";

const items = [
  { value: "order", title: "Order summary" },
  { value: "shipping", title: "Shipping address" },
  { value: "payment", title: "Payment method" },
];
</script>

<template>
  <Accordion
    :items="items"
    default-value="order"
    class="rounded-xl border bg-surface px-4"
  >
    <template #order>3 items, total $86.00 including tax.</template>
    <template #shipping>Jl. Merdeka No. 12, Bandung, West Java 40111.</template>
    <template #payment>Visa ending in 4242, expires 08/28.</template>
  </Accordion>
</template>
