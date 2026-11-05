<script setup lang="ts">
import Slider from "../../components/slider/Slider.vue";
</script>

<template>
  <div class="grid gap-6">
    <Slider name="contrast" label="Contrast" :default-value="40" />
    <Slider
      name="opacity"
      label="Opacity"
      :default-value="80"
      :show-value="false"
    />
    <Slider
      name="quality"
      label="Export quality"
      :default-value="70"
      disabled
    />
  </div>
</template>
