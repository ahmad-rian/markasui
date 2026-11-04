<script setup lang="ts">
import Breadcrumb from "../../components/breadcrumb/Breadcrumb.vue";

const items = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" },
];
</script>

<template>
  <Breadcrumb :items="items" />
</template>
