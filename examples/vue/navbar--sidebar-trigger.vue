<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Drawer from "../../components/drawer/Drawer.vue";
import Navbar from "../../components/navbar/Navbar.vue";

const links = [
  { label: "Inbox", href: "/inbox", active: true },
  { label: "Calendar", href: "/calendar" },
  { label: "Files", href: "/files" },
];

const sections = [
  { label: "Inbox", href: "/inbox" },
  { label: "Calendar", href: "/calendar" },
  { label: "Files", href: "/files" },
  { label: "Settings", href: "/settings" },
];
</script>

<template>
  <Navbar :links="links">
    <template #brand>
      <Drawer side="left" title="Workspace">
        <template #trigger>
          <Button
            variant="ghost"
            aria-label="Open sidebar"
            class="-ml-2 size-9 px-0"
          >
            <svg
              class="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
              />
              <path d="M9 4v16" />
            </svg>
          </Button>
        </template>
        <nav aria-label="Workspace" class="grid gap-1">
          <a
            v-for="section in sections"
            :key="section.href"
            :href="section.href"
            class="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-subtle"
            >{{ section.label }}</a
          >
        </nav>
      </Drawer>
      <span>Acme Mail</span>
    </template>
  </Navbar>
</template>
