<script setup lang="ts">
import CardStack from "../../components/card-stack/CardStack.vue";

const card = "grid h-full content-between gap-6 p-5";
const quote = "text-base text-ink";
const person = "flex items-center gap-3";
const avatar =
  "inline-flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-medium text-ink";
const meta = "grid";
const name = "text-sm font-medium text-ink";
const role = "text-sm text-muted";

const testimonials = [
  {
    quote:
      "We replaced three internal tools with one dashboard. Onboarding a new hire now takes an afternoon.",
    name: "Maya Putri",
    initials: "MP",
    role: "Head of Operations, Kopiloka",
  },
  {
    quote:
      "The keyboard shortcuts alone save our support team hours every single week.",
    name: "Daniel Reyes",
    initials: "DR",
    role: "Support Lead, Northwind",
  },
  {
    quote:
      "Setup took ten minutes and the docs answered every question we had.",
    name: "Sari Wijaya",
    initials: "SW",
    role: "CTO, Lumbung",
  },
  {
    quote:
      "Finally a tool our designers and engineers both enjoy opening on Monday.",
    name: "Tom Becker",
    initials: "TB",
    role: "Product Manager, Fieldnote",
  },
];
</script>

<template>
  <CardStack label="Customer testimonials">
    <figure v-for="item in testimonials" :key="item.name" :class="card">
      <blockquote :class="quote">{{ item.quote }}</blockquote>
      <figcaption :class="person">
        <span aria-hidden="true" :class="avatar">{{ item.initials }}</span>
        <span :class="meta">
          <span :class="name">{{ item.name }}</span>
          <span :class="role">{{ item.role }}</span>
        </span>
      </figcaption>
    </figure>
  </CardStack>
</template>
