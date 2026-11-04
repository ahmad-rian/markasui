<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Modal from "../../components/modal/Modal.vue";
</script>

<template>
  <Modal title="Hapus proyek?">
    <template #trigger>
      <Button variant="danger">Hapus proyek</Button>
    </template>

    Proyek dan semua datanya akan dihapus permanen.

    <template #footer>
      <Button variant="secondary" type="submit" value="batal">Batal</Button>
      <Button variant="danger" type="submit" value="hapus">Ya, hapus</Button>
    </template>
  </Modal>
</template>
