<script setup lang="ts">
import { ref } from "vue";
import Combobox from "../../components/combobox/Combobox.vue";

const people = [
  { value: "ana", label: "Ana Putri" },
  { value: "budi", label: "Budi Santoso" },
  { value: "citra", label: "Citra Lestari" },
];
const owner = ref("budi");
</script>

<template>
  <div class="grid gap-4">
    <Combobox
      name="assignee"
      label="Assignee"
      placeholder="Search people"
      hint="Only members of this project are listed."
      :options="people"
    />
    <Combobox
      name="reviewer"
      label="Reviewer"
      placeholder="Search people"
      error="Choose a reviewer before submitting."
      :options="people"
    />
    <Combobox
      v-model="owner"
      name="owner"
      label="Owner"
      disabled
      :options="people"
    />
  </div>
</template>
