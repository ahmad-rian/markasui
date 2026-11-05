<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>Acme</template>
    <template #actions>
      <Button variant="ghost" size="sm">Log in</Button>
      <Button size="sm">Get started</Button>
    </template>
  </Navbar>
</template>
