<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links = [
  {
    label: "Components",
    children: [
      {
        label: "Forms",
        href: "/components/forms",
        description: "Input, select, checkbox, and more",
        icon: "M3 7h18v10H3zM7 12h.01M11 12h6",
      },
      {
        label: "Overlays",
        href: "/components/overlays",
        description: "Modal, drawer, popover, toast",
        icon: "M8 8h12v12H8zM4 16V4h12",
      },
      {
        label: "Navigation",
        href: "/components/navigation",
        description: "Navbar, sidebar, tabs, menus",
        icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm4-13-2 6-6 2 2-6z",
      },
    ],
  },
  { label: "Templates", href: "/templates", active: true },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
];

const utilities = [
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Sign in", href: "/login" },
];

const shell = "@container grid";
const strip =
  "flex h-9 items-center gap-4 border-b border-line bg-canvas px-4 text-xs text-muted";
const status =
  "inline-flex items-center gap-2 rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const dot = "size-1.5 rounded-full bg-success ring-4 ring-success/20";
const version = "hidden rounded-full border border-line px-2 py-px @lg:inline";
const utilityNav = "ml-auto flex items-center gap-4";
const utilityLink =
  "rounded-sm transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const main = "[&>div:first-child]:h-16";
const brand = "flex items-center gap-2.5 rounded-md text-base";
const logoClass = "size-7";
const sales = "hidden @3xl:block";
</script>

<template>
  <div :class="shell">
    <div :class="strip">
      <a href="/status" :class="status">
        <span aria-hidden="true" :class="dot" />
        All systems normal
      </a>
      <span :class="version">v1.0.0</span>
      <nav aria-label="Utilities" :class="utilityNav">
        <a
          v-for="link in utilities"
          :key="link.href"
          :href="link.href"
          :class="utilityLink"
          >{{ link.label }}</a
        >
      </nav>
    </div>
    <Navbar :links="links" :class="main">
      <template #brand>
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
      </template>
      <template #actions>
        <div :class="sales">
          <Button size="sm" variant="secondary">Contact sales</Button>
        </div>
        <Button size="sm">Get started</Button>
      </template>
    </Navbar>
  </div>
</template>
