<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Toaster, { toast } from "../../components/toast/Toast.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button variant="secondary" @click="toast({ title: 'Link copied' })"
      >Default</Button
    >
    <Button
      variant="secondary"
      @click="toast({ title: 'Invitation sent', variant: 'success' })"
      >Success</Button
    >
    <Button
      variant="secondary"
      @click="toast({ title: 'Upload failed', variant: 'danger' })"
      >Danger</Button
    >
  </div>
  <Toaster />
</template>
