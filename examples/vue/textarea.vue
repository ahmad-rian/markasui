<script setup lang="ts">
import { ref } from "vue";
import Textarea from "../../components/textarea/Textarea.vue";

const alamat = ref("Jl. Merdeka");
</script>

<template>
  <div class="grid gap-4">
    <Textarea
      name="bio"
      label="Bio singkat"
      placeholder="Ceritakan sedikit tentang Anda"
      hint="Maksimal 200 karakter."
    />
    <Textarea
      v-model="alamat"
      name="alamat"
      label="Alamat"
      :rows="2"
      error="Alamat belum lengkap."
    />
  </div>
</template>
