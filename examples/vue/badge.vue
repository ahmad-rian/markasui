<script setup lang="ts">
import Badge from "../../components/badge/Badge.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Badge>Draf</Badge>
    <Badge variant="primary">Baru</Badge>
    <Badge variant="success">Aktif</Badge>
    <Badge variant="warning">Tertunda</Badge>
    <Badge variant="danger">Gagal</Badge>
  </div>
</template>
