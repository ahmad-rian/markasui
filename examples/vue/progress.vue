<script setup lang="ts">
import Progress from "../../components/progress/Progress.vue";
</script>

<template>
  <div class="grid gap-5">
    <Progress label="Uploading file" :value="60" />
    <Progress label="Storage used" :value="3" :max="4" />
    <Progress label="Preparing report" />
  </div>
</template>
