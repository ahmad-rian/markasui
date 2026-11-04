<script setup lang="ts">
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";

const items = [
  { label: "Beranda", href: "/" },
  { label: "Komponen", href: "/komponen" },
  { label: "Breadcrumb" },
];
</script>

<template>
  <Breadcrumb :items="items" />
</template>
