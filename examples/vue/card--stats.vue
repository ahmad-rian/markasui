<script setup lang="ts">
import Badge from "../../components/badge/Badge.vue";
import Card from "../../components/card/Card.vue";
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <Card>
      <p class="text-muted">Total revenue</p>
      <p class="mt-1 text-2xl font-semibold text-ink">$48,250</p>
      <div class="mt-3 flex items-center gap-2">
        <Badge variant="success">+12.5%</Badge>
        <span class="text-xs text-muted">vs last month</span>
      </div>
    </Card>
    <Card>
      <p class="text-muted">Active users</p>
      <p class="mt-1 text-2xl font-semibold text-ink">1,284</p>
      <div class="mt-3 flex items-center gap-2">
        <Badge variant="danger">-3.2%</Badge>
        <span class="text-xs text-muted">vs last month</span>
      </div>
    </Card>
  </div>
</template>
