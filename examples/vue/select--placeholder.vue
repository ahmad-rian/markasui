<script setup lang="ts">
import { ref } from "vue";
import Select from "../../components/select/Select.vue";

const country = ref("");
const industry = ref("");
</script>

<template>
  <div class="grid gap-4">
    <Select
      v-model="country"
      name="country"
      label="Country"
      hint="Used to calculate tax on your invoices."
    >
      <option value="" disabled>Select a country</option>
      <option value="id">Indonesia</option>
      <option value="my">Malaysia</option>
      <option value="sg">Singapore</option>
    </Select>
    <Select
      v-model="industry"
      name="industry"
      label="Industry"
      error="Choose the industry that fits best."
    >
      <option value="" disabled>Select an industry</option>
      <option value="education">Education</option>
      <option value="finance">Finance</option>
      <option value="retail">Retail</option>
    </Select>
  </div>
</template>
