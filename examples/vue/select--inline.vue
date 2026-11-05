<script setup lang="ts">
import { ref } from "vue";
import Select from "../../components/select/Select.vue";

const day = ref("15");
const month = ref("3");
const year = ref("1995");
</script>

<template>
  <fieldset class="min-w-0">
    <legend class="mb-1.5 text-sm font-medium text-ink">Date of birth</legend>
    <div class="grid grid-cols-[1fr_2fr_1fr] gap-3">
      <Select v-model="day" name="birth_day" aria-label="Day">
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
      </Select>
      <Select v-model="month" name="birth_month" aria-label="Month">
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
      </Select>
      <Select v-model="year" name="birth_year" aria-label="Year">
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
      </Select>
    </div>
  </fieldset>
</template>
