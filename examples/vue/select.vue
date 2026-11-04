<script setup lang="ts">
import { ref } from "vue";
import Select from "../../components/select/Select.vue";

const kota = ref("bandung");
const peran = ref("");
const paket = ref("gratis");
</script>

<template>
  <div class="grid gap-4">
    <Select v-model="kota" name="kota" label="Kota" hint="Pilih kota domisili.">
      <option value="jakarta">Jakarta</option>
      <option value="bandung">Bandung</option>
      <option value="surabaya">Surabaya</option>
    </Select>
    <Select
      v-model="peran"
      name="peran"
      label="Peran"
      error="Peran wajib dipilih."
    >
      <option value="">Pilih peran</option>
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
    </Select>
    <Select v-model="paket" name="paket" label="Paket" disabled>
      <option value="gratis">Gratis</option>
    </Select>
  </div>
</template>
