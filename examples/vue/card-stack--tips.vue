<script setup lang="ts">
import CardStack from "../../components/card-stack/CardStack.vue";

const card = "grid h-full content-between gap-4 p-5";
const step = "text-xs font-medium text-muted";
const title = "mt-1 text-base font-semibold text-ink";
const text = "mt-1 text-sm text-muted";
const link =
  "text-sm font-medium text-ink underline underline-offset-4 hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const tips = [
  {
    title: "Press K to search",
    text: "Jump to any page, project, or teammate without touching the mouse.",
  },
  {
    title: "Drag to reorder",
    text: "Grab a task by its handle and drop it where it belongs.",
  },
  {
    title: "Mention with @",
    text: "Type @ and a name to notify a teammate right inside a comment.",
  },
  {
    title: "Star what matters",
    text: "Starred projects stay pinned at the top of your sidebar.",
  },
];
</script>

<template>
  <CardStack
    label="Getting started tips"
    prev-label="Previous tip"
    next-label="Next tip"
    card-label="Tip {index} of {total}"
  >
    <div v-for="(tip, index) in tips" :key="tip.title" :class="card">
      <div>
        <p :class="step">Tip {{ index + 1 }}</p>
        <p :class="title">{{ tip.title }}</p>
        <p :class="text">{{ tip.text }}</p>
      </div>
      <a href="#shortcuts" :class="link">See all shortcuts</a>
    </div>
  </CardStack>
</template>
