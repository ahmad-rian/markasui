<script setup lang="ts">
import { ref } from "vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Features", href: "/features", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
];
const open = ref(true);
</script>

<template>
  <div class="grid">
    <div
      v-if="open"
      class="flex items-center gap-3 bg-primary py-2 pr-2 pl-4 text-sm text-on-primary"
    >
      <p class="flex-1">
        Acme 2.0 is out.
        <a
          href="/changelog"
          class="rounded-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
          >See what is new</a
        >
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        class="inline-flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
        @click="open = false"
      >
        <svg
          class="size-4"
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
      <template #brand>Acme</template>
    </Navbar>
  </div>
</template>
