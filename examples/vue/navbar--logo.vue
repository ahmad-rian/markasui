<script setup lang="ts">
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Product", href: "/product", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>
      <svg
        class="size-6 text-primary"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3-9 5 9 5 9-5-9-5z" />
        <path d="m3 13 9 5 9-5" />
      </svg>
      <span>Acme</span>
    </template>
  </Navbar>
</template>
