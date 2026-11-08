<script setup lang="ts">
import NavigationMenu from "../../components/navigation-menu/NavigationMenu.vue";

const products = [
  {
    label: "Components",
    href: "/components",
    description: "61 accessible building blocks",
    icon: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z",
  },
  {
    label: "Templates",
    href: "/templates",
    description: "Full pages you can ship today",
    icon: "M3 4h18v6H3zM3 14h8v6H3zm12 0h6v6h-6z",
  },
  {
    label: "CLI",
    href: "/docs/cli",
    description: "Add components with one command",
    icon: "m4 17 6-5-6-5m8 12h8",
  },
  {
    label: "MCP server",
    href: "/docs/mcp",
    description: "Let your editor agent install them",
    icon: "M12 8V4H8M4 12a8 8 0 0 0 8 8h8v-8a8 8 0 0 0-8-8M9 13h.01M15 13h.01",
  },
];

const developers = [
  {
    label: "Documentation",
    href: "/docs",
    description: "Guides and API reference",
    icon: "M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20",
  },
  {
    label: "Registry",
    href: "/docs/registry",
    description: "JSON for every component",
    icon: "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7m-16 5c0 1.7 3.6 3 8 3s8-1.3 8-3",
  },
  {
    label: "Changelog",
    href: "/changelog",
    description: "What shipped this week",
    icon: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  },
  {
    label: "Status",
    href: "/status",
    description: "Registry and docs uptime",
    icon: "M3 12h4l3-8 4 16 3-8h4",
  },
];

const items = [
  {
    label: "Products",
    featured: {
      title: "MarkasUI 1.0",
      href: "/changelog/1-0",
      description: "61 components for Blade, React, and Vue, now stable",
    },
    links: products,
  },
  {
    label: "Developers",
    featured: {
      title: "Start in five minutes",
      href: "/docs/installation",
      description: "Install the CLI and add your first component",
    },
    links: developers,
    active: true,
  },
  { label: "Pricing", href: "/pricing" },
];

/** A soft glow on the featured card, which is the only link placed directly in a panel. */
const glow =
  "[&_[popover]>a]:bg-[radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent_65%)]";
</script>

<template>
  <NavigationMenu :items="items" :class="glow" />
</template>
