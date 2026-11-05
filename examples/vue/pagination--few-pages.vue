<script setup lang="ts">
import Pagination from "../../components/pagination/Pagination.vue";
</script>

<template>
  <Pagination :page="2" :total="4" href="?p={page}" />
</template>
