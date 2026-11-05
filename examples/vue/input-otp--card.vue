<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/button/Button.vue";
import InputOTP from "../../components/input-otp/InputOTP.vue";

const code = ref("");
</script>

<template>
  <form class="grid gap-5 rounded-lg border border-line bg-surface p-6">
    <div class="grid gap-1">
      <p class="text-base font-semibold text-ink">Check your email</p>
      <p class="text-sm text-muted">
        We sent a 6-digit code to ana@example.com. It expires in 10 minutes.
      </p>
    </div>
    <InputOTP v-model="code" name="code" label="Verification code" />
    <Button type="submit" class="w-full">Verify email</Button>
    <p class="text-sm text-muted">
      Did not get a code?
      <a href="#" class="font-medium text-primary underline underline-offset-2"
        >Send again</a
      >
    </p>
  </form>
</template>
