<script setup lang="ts">
import Pagination from "../../components/pagination/Pagination.vue";
</script>

<template>
  <div class="grid gap-3 border-t border-line pt-3">
    <p class="text-sm text-muted">Showing 21 to 30 of 97 results</p>
    <Pagination :page="3" :total="10" href="?p={page}" />
  </div>
</template>
