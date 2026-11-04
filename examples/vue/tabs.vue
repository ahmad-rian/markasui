<script setup lang="ts">
import Tabs from "../../components/tabs/Tabs.vue";

const items = [
  { value: "akun", label: "Akun" },
  { value: "sandi", label: "Kata sandi" },
  { value: "notifikasi", label: "Notifikasi" },
];
</script>

<template>
  <Tabs :items="items" default-value="akun">
    <template #akun>Ubah nama dan email akun Anda.</template>
    <template #sandi>Ganti kata sandi secara berkala.</template>
    <template #notifikasi>Atur email yang ingin Anda terima.</template>
  </Tabs>
</template>
