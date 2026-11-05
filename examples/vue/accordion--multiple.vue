<script setup lang="ts">
import Accordion from "../../components/accordion/Accordion.vue";

const items = [
  { value: "account", title: "Account" },
  { value: "billing", title: "Billing" },
  { value: "security", title: "Security" },
];
</script>

<template>
  <Accordion
    :items="items"
    type="multiple"
    :default-value="['account', 'billing']"
  >
    <template #account>Update your name, email, and profile photo.</template>
    <template #billing
      >Manage your plan, payment method, and invoices.</template
    >
    <template #security
      >Turn on two-step verification and review active sessions.</template
    >
  </Accordion>
</template>
