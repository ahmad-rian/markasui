<script setup lang="ts">
import NavigationMenu from "../../components/navigation-menu/NavigationMenu.vue";

const items = [
  {
    label: "Products",
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Connect the tools you already use",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, audit logs, and SSO",
      },
    ],
  },
  {
    label: "Developers",
    links: [
      {
        label: "Documentation",
        href: "/docs",
        description: "Guides and API reference",
      },
      {
        label: "API",
        href: "/api",
        description: "REST endpoints and webhooks",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this month",
      },
      {
        label: "Status",
        href: "/status",
        description: "Uptime and incidents",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    active: true,
  },
  {
    label: "Blog",
    href: "/blog",
  },
];
</script>

<template>
  <NavigationMenu :items="items" />
</template>
