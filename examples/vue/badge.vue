<script setup lang="ts">
import Badge from "../../components/badge/Badge.vue";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Badge>Draft</Badge>
    <Badge variant="primary">New</Badge>
    <Badge variant="success">Active</Badge>
    <Badge variant="warning">Pending</Badge>
    <Badge variant="danger">Failed</Badge>
  </div>
</template>
