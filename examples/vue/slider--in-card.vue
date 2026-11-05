<script setup lang="ts">
import Slider from "../../components/slider/Slider.vue";
</script>

<template>
  <div class="grid gap-5 rounded-xl border border-line bg-surface p-5">
    <div class="grid gap-1">
      <h3 class="text-base font-medium text-ink">Sound</h3>
      <p class="text-sm text-muted">
        Changes apply to every device on this account.
      </p>
    </div>
    <Slider name="master" label="Master volume" :default-value="75" />
    <Slider name="music" label="Music" :default-value="50" />
    <Slider name="effects" label="Effects" :default-value="20" />
  </div>
</template>
