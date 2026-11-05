<script setup lang="ts">
import Pagination from "../../components/pagination/Pagination.vue";
</script>

<template>
  <Pagination :page="1" :total="10" href="?p={page}" />
</template>
