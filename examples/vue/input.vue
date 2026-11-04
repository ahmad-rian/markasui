<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/input/Input.vue";

const email = ref("budi@");
const code = ref("MARKAS-2026");
</script>

<template>
  <div class="grid gap-4">
    <Input
      name="name"
      label="Full name"
      placeholder="Budi Santoso"
      hint="As shown on your ID"
    />
    <Input
      v-model="email"
      name="email"
      type="email"
      label="Email"
      error="Enter a valid email address"
    />
    <Input v-model="code" name="code" label="Invite code" disabled />
  </div>
</template>
