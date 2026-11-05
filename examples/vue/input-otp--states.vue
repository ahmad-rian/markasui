<script setup lang="ts">
import { ref } from "vue";
import InputOTP from "../../components/input-otp/InputOTP.vue";

const filled = ref("482913");
const locked = ref("12");
</script>

<template>
  <div class="grid gap-6">
    <InputOTP v-model="filled" name="filled_code" label="Filled" />
    <InputOTP v-model="locked" name="locked_code" label="Disabled" disabled />
  </div>
</template>
