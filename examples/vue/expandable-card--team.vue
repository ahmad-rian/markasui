<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import ExpandableCard from "../../components/expandable-card/ExpandableCard.vue";

const grid = "grid grid-cols-2 gap-3 sm:grid-cols-3";
const portrait = "flex h-full items-center justify-center bg-primary-soft";
const avatar =
  "inline-flex size-14 items-center justify-center rounded-full bg-primary text-base font-semibold text-on-primary";
const contact = "text-muted";

const team = [
  {
    name: "Nadia Rahma",
    initials: "NR",
    role: "Engineering lead",
    bio: "Leads the platform team and loves a well-written postmortem.",
    email: "nadia@example.com",
  },
  {
    name: "Owen Park",
    initials: "OP",
    role: "Product designer",
    bio: "Sketches every flow on paper before opening a design tool.",
    email: "owen@example.com",
  },
  {
    name: "Putu Arya",
    initials: "PA",
    role: "Customer success",
    bio: "Turns tricky support tickets into product improvements.",
    email: "putu@example.com",
  },
];
</script>

<template>
  <div :class="grid">
    <ExpandableCard
      v-for="person in team"
      :key="person.name"
      :title="person.name"
      :description="person.role"
    >
      <template #media>
        <span :class="portrait">
          <span aria-hidden="true" :class="avatar">{{ person.initials }}</span>
        </span>
      </template>
      <p>{{ person.bio }}</p>
      <p :class="contact">{{ person.email }}</p>
      <template #footer>
        <Button>Send message</Button>
      </template>
    </ExpandableCard>
  </div>
</template>
