<script setup lang="ts">
import ScrollProgress from "../../components/scroll-progress/ScrollProgress.vue";

const messages = [
  "Hi, the invoice for October is ready.",
  "Thanks. Can you add the design hours too?",
  "Sure, I added 12 hours for the dashboard work.",
  "Perfect. Please send it to finance by Friday.",
  "Sent. They confirmed it this morning.",
  "Great, closing this thread then.",
];
</script>

<template>
  <div
    role="log"
    aria-label="Conversation"
    tabindex="0"
    class="relative h-52 overflow-y-auto rounded-xl border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    <ScrollProgress target="parent" color="success" size="md" />
    <ul class="space-y-2 p-4">
      <li
        v-for="(message, index) in messages"
        :key="message"
        :class="
          index % 2 === 0
            ? 'mr-12 rounded-lg bg-subtle px-3 py-2 text-sm text-ink'
            : 'ml-12 rounded-lg bg-primary px-3 py-2 text-sm text-on-primary'
        "
      >
        {{ message }}
      </li>
    </ul>
  </div>
</template>
