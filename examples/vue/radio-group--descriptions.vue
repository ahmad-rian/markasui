<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const options = [
  {
    value: "standard",
    label: "Standard",
    description: "Arrives in 4 to 6 business days. Free.",
  },
  {
    value: "express",
    label: "Express",
    description: "Arrives in 1 to 2 business days. $12.",
  },
  {
    value: "pickup",
    label: "Store pickup",
    description: "Ready for pickup tomorrow at 10:00.",
  },
];
const shipping = ref("express");
</script>

<template>
  <RadioGroup
    v-model="shipping"
    name="shipping"
    label="Shipping method"
    :options="options"
  />
</template>
