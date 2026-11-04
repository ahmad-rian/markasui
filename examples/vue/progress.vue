<script setup lang="ts">
import Progress from "../../components/progress/Progress.vue";
</script>

<template>
  <div class="grid gap-5">
    <Progress label="Mengunggah berkas" :value="60" />
    <Progress label="Penyimpanan terpakai" :value="3" :max="4" />
    <Progress label="Menyiapkan laporan" />
  </div>
</template>
