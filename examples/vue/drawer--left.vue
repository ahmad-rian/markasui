<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import Drawer from "../../components/drawer/Drawer.vue";

const link =
  "block rounded-md px-3 py-2 font-medium text-ink transition-colors duration-150 ease-out hover:bg-subtle motion-reduce:transition-none";
</script>

<template>
  <div class="flex justify-center">
    <Drawer side="left" title="Menu">
      <template #trigger>
        <Button variant="secondary" aria-label="Open menu" class="size-10 px-0">
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
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </template>

      <nav aria-label="Main">
        <ul class="grid gap-1">
          <li><a :class="link" href="#dashboard">Dashboard</a></li>
          <li><a :class="link" href="#projects">Projects</a></li>
          <li><a :class="link" href="#team">Team</a></li>
          <li><a :class="link" href="#settings">Settings</a></li>
        </ul>
      </nav>
    </Drawer>
  </div>
</template>
