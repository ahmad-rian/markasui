<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/input/Input.vue";

const username = ref("budi.santoso");
const email = ref("budi@markas");
const apiKey = ref("mk_live_4f8a2c91");
const workspace = ref("Markas Labs");
</script>

<template>
  <div class="grid gap-4">
    <Input
      v-model="username"
      name="username"
      label="Username"
      hint="Letters, numbers, and dots only."
    />
    <Input
      v-model="email"
      name="email"
      type="email"
      label="Email"
      error="Enter a valid email address."
    />
    <Input v-model="apiKey" name="api_key" label="API key" readonly />
    <Input v-model="workspace" name="workspace" label="Workspace" disabled />
  </div>
</template>
