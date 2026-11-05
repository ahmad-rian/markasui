<script setup lang="ts">
import SpotlightCard from "../../components/spotlight-card/SpotlightCard.vue";

const features = [
  { title: "Same classes", text: "Blade, React, and Vue share one markup." },
  { title: "Dark mode", text: "Tokens switch with a single class." },
  { title: "Accessible", text: "Checked with axe and the keyboard." },
  { title: "Zero runtime", text: "Copy the file, keep the code." },
];
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <SpotlightCard v-for="feature in features" :key="feature.title">
      <div class="p-4">
        <h3 class="text-sm font-semibold text-ink">{{ feature.title }}</h3>
        <p class="mt-1 text-xs text-muted">{{ feature.text }}</p>
      </div>
    </SpotlightCard>
  </div>
</template>
