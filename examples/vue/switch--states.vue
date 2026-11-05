<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../components/switch/Switch.vue";

const wifi = ref(true);
const findDevice = ref(true);
</script>

<template>
  <div class="grid gap-4">
    <Switch v-model="wifi" name="wifi" label="Wi-Fi" />
    <Switch name="bluetooth" label="Bluetooth" />
    <Switch name="location" label="Location services" disabled />
    <Switch
      v-model="findDevice"
      name="find_device"
      label="Find my device"
      disabled
    />
  </div>
</template>
