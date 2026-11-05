<script setup lang="ts">
import ToggleGroup from "../../components/toggle-group/ToggleGroup.vue";
</script>

<template>
  <div class="flex justify-center">
    <ToggleGroup
      label="Layout"
      default-value="list"
      :items="[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
      ]"
    >
      <template #list
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
          <path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1" /></svg
        >List</template
      >
      <template #grid
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
          <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" /></svg
        >Grid</template
      >
    </ToggleGroup>
  </div>
</template>
