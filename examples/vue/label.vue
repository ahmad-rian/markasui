<script setup lang="ts">
import Label from "../../components/label/Label.vue";
</script>

<template>
  <div class="grid gap-3">
    <Label required>Full name</Label>
    <Label optional>Company</Label>
    <Label>Email</Label>
  </div>
</template>
