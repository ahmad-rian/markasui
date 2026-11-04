<script setup lang="ts">
import Pagination from "../../components/pagination/Pagination.vue";
</script>

<template>
  <Pagination :page="5" :total="10" href="?halaman={page}" />
</template>
