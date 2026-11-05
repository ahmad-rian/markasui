<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const themes = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];
const sizes = [
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra large" },
];
const theme = ref("system");
const size = ref("m");
</script>

<template>
  <div class="grid gap-6">
    <RadioGroup
      v-model="theme"
      name="theme"
      label="Theme"
      orientation="horizontal"
      :options="themes"
    />
    <RadioGroup
      v-model="size"
      name="size"
      label="Size"
      orientation="horizontal"
      :options="sizes"
    />
  </div>
</template>
