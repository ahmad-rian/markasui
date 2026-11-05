<script setup lang="ts">
import ToggleGroup from "../../components/toggle-group/ToggleGroup.vue";
</script>

<template>
  <div class="flex justify-center">
    <ToggleGroup
      label="Calendar view"
      default-value="week"
      :items="[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]"
    />
  </div>
</template>
