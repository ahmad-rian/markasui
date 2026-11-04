<script lang="ts">
export type PageItem = number | "ellipsis";

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

/** Logika sama persis dengan $pageRange di pagination.blade.php dan Pagination.tsx. */
export function pageRange(
  page: number,
  total: number,
  siblings: number,
): PageItem[] {
  if (total < 1) return [];
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);
  const current = Math.min(Math.max(page, 1), total);
  const start = Math.min(
    Math.max(current - siblings, 3),
    total - 2 - siblings * 2,
  );
  const end = start + siblings * 2;

  return [
    1,
    start > 3 ? "ellipsis" : 2,
    ...range(start, end),
    end < total - 2 ? "ellipsis" : total - 1,
    total,
  ];
}
</script>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    page: number;
    total: number;
    href?: string;
    siblings?: number;
    navLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
  }>(),
  {
    href: "?page={page}",
    siblings: 1,
    navLabel: "Pagination",
    previousLabel: "Previous",
    nextLabel: "Next",
  },
);

const root = "@container";
const list = "flex flex-wrap items-center gap-1";
const link =
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border border-transparent px-2 text-sm font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-line data-[state=active]:bg-surface data-[state=active]:text-ink motion-reduce:transition-none";
const ellipsis =
  "inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted";
const icon = "size-4 shrink-0";
const label = "sr-only @lg:not-sr-only";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

const current = computed(() =>
  Math.min(Math.max(props.page, 1), Math.max(props.total, 1)),
);
const pages = computed(() =>
  pageRange(current.value, props.total, props.siblings),
);
const hrefFor = (target: number) =>
  safeHref(props.href.replaceAll("{page}", String(target)));
</script>

<template>
  <nav :aria-label="props.navLabel" :class="root">
    <ul :class="list">
      <li>
        <a
          v-if="current > 1"
          :href="hrefFor(current - 1)"
          rel="prev"
          :class="link"
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span :class="label">{{ props.previousLabel }}</span>
        </a>
        <span v-else aria-disabled="true" :class="link">
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span :class="label">{{ props.previousLabel }}</span>
        </span>
      </li>
      <li v-for="(item, index) in pages" :key="index">
        <span v-if="item === 'ellipsis'" :class="ellipsis" aria-hidden="true"
          >…</span
        >
        <a
          v-else
          :href="hrefFor(item)"
          :aria-current="item === current ? 'page' : undefined"
          :data-state="item === current ? 'active' : 'inactive'"
          :class="link"
          >{{ item }}</a
        >
      </li>
      <li>
        <a
          v-if="current < props.total"
          :href="hrefFor(current + 1)"
          rel="next"
          :class="link"
        >
          <span :class="label">{{ props.nextLabel }}</span>
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
        <span v-else aria-disabled="true" :class="link">
          <span :class="label">{{ props.nextLabel }}</span>
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
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </li>
    </ul>
  </nav>
</template>
