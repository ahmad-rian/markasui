<script setup lang="ts">
import Button from "../../components/button/Button.vue";
import StackingCards from "../../components/stacking-cards/StackingCards.vue";

const scroller =
  "h-96 overflow-y-auto rounded-xl border border-line bg-canvas px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
const intro = "py-6";
const title = "text-lg font-semibold text-ink";
const hint = "mt-1 text-sm text-muted";
const stack = "gap-4";
const card =
  "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-line bg-surface p-5";
const featured =
  "grid h-52 grid-cols-[1fr_auto] content-between gap-4 rounded-xl border border-primary bg-surface p-5";
const name = "text-base font-semibold text-ink";
const note = "mt-1 text-sm text-muted";
const price = "text-right text-xl font-semibold text-ink tabular-nums";
const period = "block text-xs font-normal text-muted";
const footer = "col-span-2 flex items-center justify-between gap-3";
const perks = "text-sm text-muted";
const plans = [
  {
    name: "Starter",
    note: "For solo makers",
    price: "Rp 0",
    perks: "1 project, community help",
    featured: false,
  },
  {
    name: "Team",
    note: "For small studios",
    price: "Rp 149.000",
    perks: "10 projects, chat support",
    featured: true,
  },
  {
    name: "Business",
    note: "For growing companies",
    price: "Rp 499.000",
    perks: "Unlimited, priority support",
    featured: false,
  },
];
</script>

<template>
  <section tabindex="0" aria-label="Pricing plans" :class="scroller">
    <div :class="intro">
      <h3 :class="title">Simple pricing in Rupiah</h3>
      <p :class="hint">Prices per month, tax included</p>
    </div>
    <StackingCards variant="blur" :offset="20" :class="stack">
      <article
        v-for="plan in plans"
        :key="plan.name"
        :class="plan.featured ? featured : card"
      >
        <div>
          <h4 :class="name">{{ plan.name }}</h4>
          <p :class="note">{{ plan.note }}</p>
        </div>
        <p :class="price">
          {{ plan.price }}<span :class="period">per month</span>
        </p>
        <div :class="footer">
          <p :class="perks">{{ plan.perks }}</p>
          <Button :variant="plan.featured ? 'primary' : 'secondary'"
            >Choose {{ plan.name }}</Button
          >
        </div>
      </article>
    </StackingCards>
  </section>
</template>
