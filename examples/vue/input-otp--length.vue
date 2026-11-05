<script setup lang="ts">
import { ref } from "vue";
import InputOTP from "../../components/input-otp/InputOTP.vue";

const pin = ref("");
</script>

<template>
  <InputOTP v-model="pin" name="pin" label="Card PIN" :length="4" />
</template>
