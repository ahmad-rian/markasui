<script setup lang="ts">
import Slider from "../../components/slider/Slider.vue";
</script>

<template>
  <div class="grid gap-6">
    <Slider name="volume" label="Volume" :default-value="60" />
    <Slider
      name="brightness"
      label="Brightness"
      :step="10"
      :default-value="30"
    />
  </div>
</template>
