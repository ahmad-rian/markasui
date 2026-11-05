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
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
        icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Connect the tools you already use",
        icon: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm13 0v6m-3-3h6",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, audit logs, and SSO",
        icon: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z",
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
        icon: "M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20",
      },
      {
        label: "API",
        href: "/api",
        description: "REST endpoints and webhooks",
        icon: "m8 9-4 3 4 3m8-6 4 3-4 3m-6 4 4-14",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this month",
        icon: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
      },
      {
        label: "Status",
        href: "/status",
        description: "Uptime and incidents",
        icon: "M3 12h4l3-8 4 16 3-8h4",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];
</script>

<template>
  <NavigationMenu :items="items" />
</template>
