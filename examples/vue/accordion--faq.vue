<script setup lang="ts">
import Accordion from "../../components/accordion/Accordion.vue";

const items = [
  { value: "trial", title: "Is there a free trial?" },
  { value: "cancel", title: "Can I cancel at any time?" },
  { value: "team", title: "Can I invite my team?" },
  { value: "data", title: "Where is my data stored?" },
];
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-1">
      <h2 class="text-base font-semibold text-ink">
        Frequently asked questions
      </h2>
      <p class="text-sm text-muted">
        Still have questions? Contact our support team.
      </p>
    </div>
    <Accordion :items="items">
      <template #trial
        >Yes. Every plan starts with a 14 day trial, no card required.</template
      >
      <template #cancel
        >Yes. Your plan stays active until the end of the billing
        period.</template
      >
      <template #team
        >Invite as many members as your plan allows from the team
        settings.</template
      >
      <template #data
        >Data is stored in Jakarta and backed up every day.</template
      >
    </Accordion>
  </div>
</template>
