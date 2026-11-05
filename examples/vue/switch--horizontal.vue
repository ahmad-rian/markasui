<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../components/switch/Switch.vue";

const autoplay = ref(true);
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-3">
    <Switch v-model="autoplay" name="autoplay" label="Autoplay" />
    <Switch name="captions" label="Captions" />
    <Switch name="loop" label="Loop" />
  </div>
</template>
