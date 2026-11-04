<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>MarkasUI</template>
    <template #actions>
      <Button size="sm">Sign in</Button>
    </template>
  </Navbar>
</template>
