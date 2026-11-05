<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    open?: boolean;
  }>(),
  { title: "", open: false },
);

const root = "group w-full";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pt-2 pb-2 text-sm text-muted";
</script>

<template>
  <details :class="root" :open="props.open">
    <summary :class="summary">
      <span
        ><slot name="title">{{ props.title }}</slot></span
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
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div :class="content"><slot /></div>
  </details>
</template>
