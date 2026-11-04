<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Toaster, { toast } from "../../components/toast/Toast.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button
      @click="
        toast({
          title: 'Perubahan disimpan',
          description: 'Profil Anda sudah diperbarui.',
          variant: 'success',
          duration: 0,
        })
      "
    >
      Tampilkan toast
    </Button>
    <Button
      variant="secondary"
      @click="toast({ title: 'Draf tersimpan otomatis' })"
    >
      Toast sementara
    </Button>
  </div>
  <Toaster />
</template>
