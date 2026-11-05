<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  {
    label: "Product",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage in real time",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, SSO, and audit logs",
      },
    ],
  },
  {
    label: "Customers",
    href: "/customers",
  },
  {
    label: "Pricing",
    href: "/pricing",
    active: true,
  },
];
</script>

<template>
  <Navbar :links="links" variant="floating">
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
    <template #actions>
      <Button size="sm">Get started</Button>
    </template>
  </Navbar>
</template>
