<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/input/Input.vue";

const icon = "pointer-events-none absolute bottom-3 left-3 size-4 text-muted";
const password = ref("correct-horse");
</script>

<template>
  <div class="grid gap-4">
    <div class="relative">
      <Input
        type="search"
        name="q"
        aria-label="Search projects"
        placeholder="Search projects"
        class="pl-9!"
      />
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
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </div>
    <div class="relative">
      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="you@example.com"
        class="pl-9!"
      />
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
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    </div>
    <div class="relative">
      <Input
        v-model="password"
        type="password"
        name="password"
        label="Password"
        class="pl-9!"
      />
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
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    </div>
  </div>
</template>
