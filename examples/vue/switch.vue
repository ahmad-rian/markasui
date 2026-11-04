<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../components/switch/Switch.vue";

const notifications = ref(true);
const saver = ref(false);
</script>

<template>
  <div class="grid gap-4">
    <Switch
      v-model="notifications"
      name="notifications"
      label="Email notifications"
    />
    <Switch v-model="saver" name="saver" label="Data saver mode" />
    <Switch name="beta" label="Beta features" disabled />
  </div>
</template>
