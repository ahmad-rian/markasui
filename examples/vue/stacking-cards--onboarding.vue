<script setup lang="ts">
import StackingCards from "../../components/stacking-cards/StackingCards.vue";

const scroller =
  "h-96 overflow-y-auto rounded-xl bg-primary-soft px-6 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
const intro = "py-6 text-center";
const title = "text-lg font-semibold text-ink";
const hint = "mt-1 text-sm text-muted";
const stack = "gap-6";
const card =
  "grid h-44 content-center justify-items-center gap-2 rounded-xl border border-primary-line bg-surface p-5 text-center";
const step = "text-sm font-medium text-primary";
const cardTitle = "text-lg font-semibold text-ink";
const cardText = "max-w-64 text-sm text-muted";
const steps = [
  {
    title: "Create your workspace",
    text: "Pick a name and a currency. Rupiah is ready from the start.",
  },
  {
    title: "Invite your team",
    text: "Add Rania from finance and Dimas from sales in one go.",
  },
  {
    title: "Connect your bank",
    text: "Link a business account to match payments automatically.",
  },
  {
    title: "Send your first invoice",
    text: "Customers pay by transfer or QRIS and you get notified.",
  },
];
</script>

<template>
  <section tabindex="0" aria-label="Getting started" :class="scroller">
    <div :class="intro">
      <h3 :class="title">Get started in four steps</h3>
      <p :class="hint">About ten minutes in total</p>
    </div>
    <StackingCards
      role="list"
      variant="fan"
      :top="24"
      :offset="10"
      :class="stack"
    >
      <li v-for="(item, index) in steps" :key="item.title" :class="card">
        <span :class="step">Step {{ index + 1 }} of 4</span>
        <h4 :class="cardTitle">{{ item.title }}</h4>
        <p :class="cardText">{{ item.text }}</p>
      </li>
    </StackingCards>
  </section>
</template>
