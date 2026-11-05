<script setup lang="ts">
import ToggleGroup from "../../components/toggle-group/ToggleGroup.vue";
</script>

<template>
  <div class="flex justify-center">
    <ToggleGroup
      type="multiple"
      label="Text style"
      :default-value="['bold', 'underline']"
      :items="[
        { value: 'bold', label: 'Bold', ariaLabel: 'Bold' },
        { value: 'italic', label: 'Italic', ariaLabel: 'Italic' },
        { value: 'underline', label: 'Underline', ariaLabel: 'Underline' },
      ]"
    >
      <template #bold
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
          <path
            d="M7 5h6a3.5 3.5 0 0 1 0 7H7zm0 7h7a3.5 3.5 0 0 1 0 7H7z"
          /></svg
      ></template>
      <template #italic
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
      ></template>
      <template #underline
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
          <path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14" /></svg
      ></template>
    </ToggleGroup>
  </div>
</template>
