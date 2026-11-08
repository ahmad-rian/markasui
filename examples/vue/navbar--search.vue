<script setup lang="ts">
import Kbd from "../../components/kbd/Kbd.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Guides", href: "/guides", active: true },
  { label: "API", href: "/api" },
  { label: "Blog", href: "/blog" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>Acme Docs</template>
    <template #actions>
      <button
        type="button"
        aria-keyshortcuts="Meta+K"
        class="inline-flex h-9 w-44 items-center gap-2 rounded-lg border border-line bg-canvas pr-1.5 pl-3 text-sm text-muted transition-colors duration-150 ease-out hover:bg-subtle"
      >
        <svg
          class="size-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m21 21-4.3-4.3" />
          <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
        </svg>
        <span class="flex-1 text-left">Search docs</span>
        <Kbd size="sm">⌘K</Kbd>
      </button>
    </template>
  </Navbar>
</template>
