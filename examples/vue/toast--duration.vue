<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Toaster, { toast } from "../../components/toast/Toast.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button
      variant="secondary"
      @click="toast({ title: 'Message archived', duration: 3000 })"
      >Short (3s)</Button
    >
    <Button
      variant="secondary"
      @click="
        toast({
          title: 'Report is ready',
          description: 'Download it from the exports page.',
        })
      "
      >Default (5s)</Button
    >
    <Button
      @click="
        toast({
          title: 'New version available',
          description: 'Reload the page to update.',
          duration: 0,
        })
      "
      >Stay open</Button
    >
  </div>
  <Toaster />
</template>
