<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const frequencies = [
  { value: "daily", label: "Daily", description: "Every morning at 08:00." },
  { value: "weekly", label: "Weekly", description: "Every Monday morning." },
  {
    value: "never",
    label: "Never",
    description: "Only important account notices.",
  },
];
const digest = ref("weekly");
</script>

<template>
  <form class="grid gap-6 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
      <p class="text-base font-semibold text-ink">Digest emails</p>
      <p class="text-sm text-muted">
        A summary of activity in projects you follow.
      </p>
    </div>
    <RadioGroup
      v-model="digest"
      name="digest"
      label="Frequency"
      :options="frequencies"
    />
    <div class="flex justify-end gap-2">
      <Button variant="secondary">Cancel</Button>
      <Button type="submit">Save</Button>
    </div>
  </form>
</template>
