<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Beranda", href: "/", active: true },
  { label: "Komponen", href: "/komponen" },
  { label: "Dokumentasi", href: "/dokumentasi" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Masuk</Button>
    </template>
  </Navbar>
</template>
