<script setup lang="ts">
import { ref } from "vue";
import Combobox from "../../components/combobox/Combobox.vue";

const timezones = [
  { value: "asia-jakarta", label: "Asia/Jakarta (UTC+7)" },
  { value: "asia-makassar", label: "Asia/Makassar (UTC+8)" },
  { value: "asia-jayapura", label: "Asia/Jayapura (UTC+9)" },
  { value: "asia-singapore", label: "Asia/Singapore (UTC+8)" },
  { value: "europe-london", label: "Europe/London (UTC+0)" },
  { value: "america-new-york", label: "America/New_York (UTC-5)" },
];
const timezone = ref("asia-jakarta");
</script>

<template>
  <Combobox
    v-model="timezone"
    name="timezone"
    label="Time zone"
    hint="Used for reminders and report schedules."
    :options="timezones"
  />
</template>
