<script setup lang="ts">
import Slider from "../../components/slider/Slider.vue";
</script>

<template>
  <div class="grid gap-2">
    <Slider
      name="budget"
      label="Budget"
      :max="500"
      :step="25"
      :default-value="250"
    />
    <div class="flex justify-between text-xs text-muted">
      <span>0</span>
      <span>500</span>
    </div>
  </div>
</template>
