<script setup lang="ts">
import Button from "../../components/button/Button.vue";
</script>

<template>
  <div class="grid gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <Button>Simpan</Button>
      <Button variant="secondary">Batal</Button>
      <Button variant="ghost">Lainnya</Button>
      <Button variant="danger">Hapus</Button>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <Button size="sm">Kecil</Button>
      <Button size="md">Sedang</Button>
      <Button size="lg">Besar</Button>
      <Button disabled>Nonaktif</Button>
    </div>
  </div>
</template>
