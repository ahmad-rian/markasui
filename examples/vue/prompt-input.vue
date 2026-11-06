<script setup lang="ts">
import PromptInput from "../../components/prompt-input/PromptInput.vue";

const panel = "grid gap-4";
const title = "text-center text-lg font-semibold text-ink";
</script>

<template>
  <div :class="panel">
    <p :class="title">What should we build today?</p>
    <PromptInput
      :models="['Markas Pro', 'Markas Mini']"
      model="Markas Pro"
      :max-length="500"
      accept="image/*,.pdf"
    />
  </div>
</template>
