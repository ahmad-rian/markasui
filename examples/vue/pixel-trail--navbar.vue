<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import PixelTrail from "../../components/pixel-trail/PixelTrail.vue";

const bar =
  "flex h-16 items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4";
const brand = "text-base font-semibold text-ink";
const links = "flex gap-4 text-sm text-muted";
const link =
  "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pages = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
];
</script>

<template>
  <PixelTrail color="ink" :cell-size="8" :fade="400" :class="bar">
    <span :class="brand">Markas</span>
    <nav aria-label="Main">
      <ul :class="links">
        <li v-for="page in pages" :key="page.label">
          <a :href="page.href" :class="link">{{ page.label }}</a>
        </li>
      </ul>
    </nav>
    <Button size="sm">Sign in</Button>
  </PixelTrail>
</template>
