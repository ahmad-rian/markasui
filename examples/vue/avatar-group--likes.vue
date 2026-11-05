<script setup lang="ts">
import AvatarGroup from "../../components/avatar-group/AvatarGroup.vue";

const people = [
  { name: "Maya Putri" },
  { name: "Rizal Hakim" },
  { name: "Ana Lim" },
  { name: "John Carter" },
  { name: "Siti Aminah" },
  { name: "Budi Santoso" },
];
</script>

<template>
  <div class="flex items-center gap-2 pt-8">
    <AvatarGroup :items="people" size="sm" :max="3" group-label="Liked by" />
    <p class="text-sm text-muted">
      <span class="font-medium text-ink">Maya Putri</span> and 5 others liked
      this
    </p>
  </div>
</template>
