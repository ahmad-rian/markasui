<script setup lang="ts">
import { ref } from "vue";
import PromptInput from "../../components/prompt-input/PromptInput.vue";

const loading = ref(true);
const text = ref("Summarize the March invoices by client");
</script>

<template>
  <PromptInput
    v-model="text"
    :loading="loading"
    @stop="loading = false"
    @send="loading = true"
  />
</template>
