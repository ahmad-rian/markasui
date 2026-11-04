<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Drawer from "../../components/drawer/Drawer.vue";
</script>

<template>
  <Drawer title="Filter produk">
    <template #trigger>
      <Button variant="secondary">Buka filter</Button>
    </template>

    Pilih kategori dan rentang harga untuk menyaring daftar produk.

    <template #footer>
      <Button variant="secondary" type="submit" value="batal">Batal</Button>
      <Button type="submit" value="terapkan">Terapkan</Button>
    </template>
  </Drawer>
</template>
