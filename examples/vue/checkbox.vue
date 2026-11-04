<script setup lang="ts">
import { ref } from "vue";
import Checkbox from "../../components/checkbox/Checkbox.vue";

const syarat = ref(true);
const kabar = ref(false);
</script>

<template>
  <div class="grid gap-4">
    <Checkbox
      v-model="syarat"
      name="syarat"
      label="Saya setuju dengan syarat layanan"
    />
    <Checkbox
      v-model="kabar"
      name="kabar"
      label="Kirimi saya kabar terbaru"
      description="Paling banyak satu email per bulan."
    />
    <Checkbox name="arsip" label="Arsipkan otomatis" disabled />
  </div>
</template>
