<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Toaster, { toast } from "../../components/toast/Toast.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button
      @click="
        toast({
          title: 'Changes saved',
          description: 'Your profile has been updated',
          variant: 'success',
          duration: 0,
        })
      "
    >
      Show toast
    </Button>
    <Button
      variant="secondary"
      @click="toast({ title: 'Draft saved automatically' })"
    >
      Temporary toast
    </Button>
  </div>
  <Toaster />
</template>
