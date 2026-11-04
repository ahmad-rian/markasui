<script setup lang="ts">
import { computed, useId } from "vue";

export type AccordionItem = { value: string; title: string };

const props = withDefaults(
  defineProps<{
    items: AccordionItem[];
    type?: "single" | "multiple";
    defaultValue?: string | string[];
  }>(),
  { type: "single", defaultValue: undefined },
);

const root = "w-full divide-y divide-line border-y border-line";
const item = "group";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pb-4 text-sm text-muted";

const generatedName = useId();
const openValues = computed(() => {
  const defaults = ([] as string[]).concat(props.defaultValue ?? []);
  return props.type === "single" ? defaults.slice(0, 1) : defaults;
});
const name = computed(() =>
  props.type === "single" ? generatedName : undefined,
);
</script>

<template>
  <div :class="root">
    <details
      v-for="entry in props.items"
      :key="entry.value"
      :class="item"
      :name="name"
      :open="openValues.includes(entry.value)"
    >
      <summary :class="summary">
        <span>{{ entry.title }}</span>
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div :class="content"><slot :name="entry.value" /></div>
    </details>
  </div>
</template>
