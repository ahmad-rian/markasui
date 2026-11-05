<script setup lang="ts">
import { ref } from "vue";
import Combobox from "../../components/combobox/Combobox.vue";

const countries = [
  { value: "au", label: "Australia" },
  { value: "id", label: "Indonesia" },
  { value: "jp", label: "Japan" },
  { value: "my", label: "Malaysia" },
  { value: "ph", label: "Philippines" },
  { value: "sg", label: "Singapore" },
  { value: "th", label: "Thailand" },
  { value: "vn", label: "Vietnam" },
];
const country = ref("");
</script>

<template>
  <Combobox
    v-model="country"
    name="country"
    label="Country"
    placeholder="Search countries"
    hint="Start typing to filter the list."
    :options="countries"
  />
</template>
