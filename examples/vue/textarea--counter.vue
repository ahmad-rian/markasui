<script setup lang="ts">
import { ref } from "vue";
import Textarea from "../../components/textarea/Textarea.vue";

const summary = ref(
  "Weekly sync moves to Thursday at 10:00. Please review the roadmap draft before the meeting.",
);
</script>

<template>
  <div class="grid gap-1.5">
    <Textarea
      v-model="summary"
      name="summary"
      label="Summary"
      :rows="3"
      maxlength="200"
    />
    <div class="flex justify-between gap-4 text-sm text-muted">
      <p>Visible to everyone in the project.</p>
      <p>91 / 200</p>
    </div>
  </div>
</template>
