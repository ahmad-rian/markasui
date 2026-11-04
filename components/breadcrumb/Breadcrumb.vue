<script setup lang="ts">
export type BreadcrumbItem = { label: string; href?: string };

const props = withDefaults(
  defineProps<{
    items: BreadcrumbItem[];
    navLabel?: string;
  }>(),
  { navLabel: "Breadcrumb" },
);

const list = "flex flex-wrap items-center gap-1.5 text-sm text-muted";
const item = "inline-flex items-center gap-1.5";
const link =
  "rounded-md transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const current = "font-medium text-ink";
const separator = "size-3.5 shrink-0 text-faint";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};
</script>

<template>
  <nav :aria-label="props.navLabel">
    <ol :class="list">
      <li v-for="(crumb, index) in props.items" :key="index" :class="item">
        <span
          v-if="index === props.items.length - 1"
          aria-current="page"
          :class="current"
          >{{ crumb.label }}</span
        >
        <a v-else-if="crumb.href" :href="safeHref(crumb.href)" :class="link">{{
          crumb.label
        }}</a>
        <span v-else>{{ crumb.label }}</span>
        <svg
          v-if="index !== props.items.length - 1"
          :class="separator"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
    </ol>
  </nav>
</template>
