<script setup lang="ts">
import Marquee from "../../components/marquee/Marquee.vue";

const events = [
  { who: "Maya Putri", what: "deployed to production", when: "2 min ago" },
  { who: "Rizal Hakim", what: "opened a pull request", when: "8 min ago" },
  { who: "Ana Lim", what: "closed 3 issues", when: "15 min ago" },
  { who: "John Carter", what: "commented on Tabs", when: "21 min ago" },
];
</script>

<template>
  <Marquee vertical :duration="18" class="h-64">
    <div
      v-for="event in events"
      :key="event.who"
      class="rounded-lg border border-line bg-surface px-4 py-3"
    >
      <p class="text-sm text-ink">
        <span class="font-medium">{{ event.who }}</span> {{ event.what }}
      </p>
      <p class="mt-0.5 text-xs text-muted">{{ event.when }}</p>
    </div>
  </Marquee>
</template>
