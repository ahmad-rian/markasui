<script setup lang="ts">
import ElasticLine from "../../components/elastic-line/ElasticLine.vue";

const footer = "grid gap-1";
const row = "flex items-center justify-between gap-4 text-sm text-muted";
const links = "flex gap-4";
const link =
  "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const pages = [
  { label: "Docs", href: "/docs" },
  { label: "Templates", href: "/templates" },
  { label: "GitHub", href: "https://github.com/markasui/markasui" },
];
</script>

<template>
  <footer :class="footer">
    <ElasticLine color="muted" :stroke-width="1" :reach="20" />
    <div :class="row">
      <p>2026 MarkasUI, Bandung</p>
      <nav aria-label="Footer">
        <ul :class="links">
          <li v-for="page in pages" :key="page.label">
            <a :href="page.href" :class="link">{{ page.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>
