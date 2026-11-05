<script setup lang="ts">
import AvatarGroup from "../../components/avatar-group/AvatarGroup.vue";

const team = [
  { name: "Dewi Lestari" },
  { name: "Budi Santoso" },
  { name: "Siti Aminah" },
  { name: "John Carter" },
  { name: "Maya Putri" },
];
</script>

<template>
  <div class="flex flex-col gap-5 pt-8">
    <AvatarGroup :items="team" size="sm" :max="3" group-label="Small" />
    <AvatarGroup :items="team" :max="3" group-label="Medium" />
    <AvatarGroup :items="team" size="lg" :max="3" group-label="Large" />
  </div>
</template>
