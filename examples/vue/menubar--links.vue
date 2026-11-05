<script setup lang="ts">
import Menubar from "../../components/menubar/Menubar.vue";

const menus = [
  {
    label: "Products",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
      },
      {
        label: "Automation",
        href: "/automation",
      },
      {
        label: "Reports",
        href: "/reports",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Contact",
        href: "mailto:hello@example.com",
      },
    ],
  },
];
</script>

<template>
  <Menubar label="Site" :menus="menus" />
</template>
