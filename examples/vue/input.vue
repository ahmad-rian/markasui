<script setup lang="ts">
import { ref } from "vue";
import Input from "../../components/input/Input.vue";

const email = ref("budi@");
const kode = ref("MARKAS-2026");
</script>

<template>
  <div class="grid gap-4">
    <Input
      name="nama"
      label="Nama lengkap"
      placeholder="Budi Santoso"
      hint="Sesuai KTP."
    />
    <Input
      v-model="email"
      name="email"
      type="email"
      label="Email"
      error="Format email belum benar."
    />
    <Input v-model="kode" name="kode" label="Kode undangan" disabled />
  </div>
</template>
