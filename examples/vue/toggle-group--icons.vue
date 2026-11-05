<script setup lang="ts">
import ToggleGroup from "../../components/toggle-group/ToggleGroup.vue";
</script>

<template>
  <div class="flex justify-center">
    <ToggleGroup
      label="Text alignment"
      default-value="left"
      :items="[
        { value: 'left', label: 'Align left', ariaLabel: 'Align left' },
        { value: 'center', label: 'Align center', ariaLabel: 'Align center' },
        { value: 'right', label: 'Align right', ariaLabel: 'Align right' },
      ]"
    >
      <template #left
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
          <path d="M4 6h16M4 12h10M4 18h14" /></svg
      ></template>
      <template #center
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
          <path d="M4 6h16M7 12h10M5 18h14" /></svg
      ></template>
      <template #right
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
          <path d="M4 6h16M10 12h10M6 18h14" /></svg
      ></template>
    </ToggleGroup>
  </div>
</template>
