<script setup lang="ts">
import { ref } from "vue";
import Switch from "../../components/switch/Switch.vue";

const notifikasi = ref(true);
const hemat = ref(false);
</script>

<template>
  <div class="grid gap-4">
    <Switch v-model="notifikasi" name="notifikasi" label="Notifikasi email" />
    <Switch v-model="hemat" name="hemat" label="Mode hemat data" />
    <Switch name="beta" label="Fitur beta" disabled />
  </div>
</template>
