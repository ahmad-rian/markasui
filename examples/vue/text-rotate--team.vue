<script setup lang="ts">
import TextRotate from "../../components/text-rotate/TextRotate.vue";
</script>

<template>
  <div
    class="flex items-center gap-3 rounded-xl border border-line bg-surface p-4"
  >
    <span
      aria-hidden="true"
      class="grid size-10 place-items-center rounded-full bg-subtle text-sm font-medium text-ink"
      >MU</span
    >
    <p class="text-sm text-muted">
      Reviewed by
      <TextRotate
        :words="['Dewi Lestari', 'Budi Santoso', 'Siti Aminah', 'Rizal Hakim']"
        from="random"
        class="font-medium text-ink"
      />
    </p>
  </div>
</template>
