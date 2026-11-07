<script setup lang="ts">
import TextRotate from "../../components/text-rotate/TextRotate.vue";
</script>

<template>
  <h2 class="text-3xl font-semibold tracking-tight text-ink">
    Build for
    <TextRotate :words="['Laravel', 'React', 'Vue']" class="text-muted" />
  </h2>
</template>
