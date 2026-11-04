<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "../../components/radio-group/RadioGroup.vue";

const paketOptions = [
  { value: "gratis", label: "Gratis", description: "Untuk proyek pribadi." },
  {
    value: "pro",
    label: "Pro",
    description: "Untuk tim kecil hingga 10 orang.",
  },
  {
    value: "bisnis",
    label: "Bisnis",
    description: "Untuk organisasi dengan kebutuhan khusus.",
  },
];
const tagihanOptions = [
  { value: "bulanan", label: "Bulanan" },
  { value: "tahunan", label: "Tahunan" },
];
const paket = ref("pro");
const tagihan = ref("bulanan");
</script>

<template>
  <div class="grid gap-6">
    <RadioGroup
      v-model="paket"
      name="paket"
      label="Paket langganan"
      :options="paketOptions"
    />
    <RadioGroup
      v-model="tagihan"
      name="tagihan"
      label="Siklus tagihan"
      orientation="horizontal"
      :options="tagihanOptions"
    />
  </div>
</template>
