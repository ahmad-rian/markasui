<script setup lang="ts">
import Toggle from "../../components/toggle/Toggle.vue";
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <Toggle aria-label="Bold" default-pressed
      ><svg
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z" /></svg
    ></Toggle>
    <Toggle aria-label="Italic"
      ><svg
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M10 4h9M5 20h9M15 4 9 20" /></svg
    ></Toggle>
    <Toggle variant="outline"
      ><svg
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4h12v16l-6-4-6 4z" /></svg
      >Bookmark</Toggle
    >
  </div>
</template>
