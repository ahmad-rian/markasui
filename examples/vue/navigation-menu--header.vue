<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import NavigationMenu from "../../components/navigation-menu/NavigationMenu.vue";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

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
  { label: "Developers", links: developers },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const header =
  "@container flex items-center gap-3 rounded-2xl border border-line bg-surface/80 py-2 pr-2 pl-4 backdrop-blur-md";
const brand =
  "flex shrink-0 items-center gap-2 rounded-md text-sm font-semibold text-ink";
const logoClass = "size-6";
/** The glow targets the featured card, the only link placed directly in a panel. */
const nav =
  "min-w-0 flex-1 [&_[popover]>a]:bg-[radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent_65%)]";
const actions = "flex shrink-0 items-center gap-2";
const signIn = "hidden @lg:block";
</script>

<template>
  <header :class="header">
    <a href="/" :class="brand">
      <svg :class="logoClass" viewBox="0 0 1464 1430" aria-hidden="true">
        <polygon
          v-for="shape in logo"
          :key="shape.points"
          :class="shape.fill"
          :points="shape.points"
        />
      </svg>
      <span>MarkasUI</span>
    </a>
    <NavigationMenu :items="items" :class="nav" />
    <div :class="actions">
      <div :class="signIn">
        <Button variant="ghost" size="sm">Sign in</Button>
      </div>
      <Button size="sm">Get started</Button>
    </div>
  </header>
</template>
