<script setup lang="ts">
import Accordion from "../../components/accordion/Accordion.vue";

const items = [
  { value: "pengiriman", title: "Berapa lama pengiriman?" },
  { value: "pembayaran", title: "Metode pembayaran apa saja?" },
  { value: "retur", title: "Bagaimana cara retur barang?" },
];
</script>

<template>
  <Accordion :items="items" default-value="pengiriman">
    <template #pengiriman>Pesanan tiba dalam 2 sampai 4 hari kerja.</template>
    <template #pembayaran
      >Transfer bank, kartu kredit, dan dompet digital.</template
    >
    <template #retur>Ajukan retur dalam 7 hari lewat halaman pesanan.</template>
  </Accordion>
</template>
