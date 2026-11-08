<script setup lang="ts">
import { ref } from "vue";
import Badge from "../../components/badge/Badge.vue";
import Button from "../../components/button/Button.vue";
import Navbar from "../../components/navbar/Navbar.vue";
import ThemeToggle from "../../components/theme-toggle/ThemeToggle.vue";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components", active: true },
  { label: "Templates", href: "/templates" },
  { label: "Changelog", href: "/changelog" },
];

const shell = "@container grid";
const bar =
  "relative flex items-center justify-center bg-primary bg-[radial-gradient(45%_160%_at_50%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent)] py-2 pr-11 pl-4 text-sm text-on-primary";
const message =
  "group inline-flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const badge = "bg-surface!";
const headline = "truncate font-medium";
const detail = "hidden text-on-primary/75 @lg:inline";
const arrow =
  "size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none";
const dismiss =
  "absolute right-2 inline-flex size-7 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const icon = "size-4";
const open = ref(true);
const brand = "flex items-center gap-2 rounded-md";
const logoClass = "size-6";
</script>

<template>
  <div :class="shell">
    <div v-if="open" :class="bar">
      <a href="/changelog" :class="message">
        <Badge variant="success" :class="badge">New</Badge>
        <span :class="headline">MarkasUI 1.0 is here</span>
        <span :class="detail">Read the release notes</span>
        <svg
          :class="arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </a>
      <button
        type="button"
        aria-label="Dismiss announcement"
        :class="dismiss"
        @click="open = false"
      >
        <svg
          :class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
    <Navbar :links="links">
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
        <ThemeToggle size="sm" animation="eclipse" />
        <Button size="sm">Get started</Button>
      </template>
    </Navbar>
  </div>
</template>
