<script setup lang="ts">
import { ref } from "vue";
import InputOTP from "../../components/input-otp/InputOTP.vue";

const code = ref("");
</script>

<template>
  <InputOTP v-model="code" name="code" label="Verification code" />
</template>
