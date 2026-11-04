<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Card from "../../components/card/Card.vue";
</script>

<template>
  <Card title="Paket Pro" description="Untuk tim kecil yang sedang tumbuh.">
    Termasuk 10 anggota tim, penyimpanan 50 GB, dan laporan bulanan.

    <template #footer>
      <Button size="sm">Pilih paket</Button>
      <Button variant="ghost" size="sm">Bandingkan</Button>
    </template>
  </Card>
</template>
