<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Toaster, { toast } from "../../components/toast/Toast.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button variant="secondary" @click="toast({ title: 'Settings updated' })"
      >Title only</Button
    >
    <Button
      @click="
        toast({
          title: 'Payment failed',
          description: 'Your card was declined. Try another payment method.',
          variant: 'danger',
        })
      "
      >With description</Button
    >
  </div>
  <Toaster />
</template>
