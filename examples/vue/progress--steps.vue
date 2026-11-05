<script setup lang="ts">
import Progress from "../../components/progress/Progress.vue";
</script>

<template>
  <div class="grid gap-5">
    <Progress label="Onboarding tasks" :value="3" :max="5" />
    <Progress label="Lessons watched" :value="7" :max="12" />
  </div>
</template>
