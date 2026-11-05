<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";

const wrap = ref(true);
const autosave = ref(true);
</script>

<template>
  <div class="grid gap-4">
    <Checkbox name="line_numbers" label="Show line numbers" />
    <Checkbox v-model="wrap" name="wrap" label="Wrap long lines" />
    <Checkbox name="format" label="Format on save" disabled />
    <Checkbox v-model="autosave" name="autosave" label="Auto save" disabled />
    <p class="text-sm text-muted">
      Editor defaults are managed by your organization.
    </p>
  </div>
</template>
