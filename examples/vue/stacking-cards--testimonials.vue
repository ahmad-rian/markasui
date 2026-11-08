<script setup lang="ts">
import StackingCards from "../../components/stacking-cards/StackingCards.vue";

const scroller =
  "h-96 overflow-y-auto rounded-xl border border-line bg-surface px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
const intro = "py-6";
const title = "text-lg font-semibold text-ink";
const stack = "gap-4";
const quotes = [
  {
    text: "We shipped our checkout in Blade and the admin in Vue with the same buttons. Nobody noticed the seams.",
    name: "Rania Putri",
    role: "Founder, Bandung",
    card: "grid h-56 content-between rounded-xl bg-primary p-6 text-on-primary",
    meta: "text-sm text-on-primary/80",
  },
  {
    text: "Dark mode took one afternoon because every color is a token.",
    name: "Dimas Pratama",
    role: "CTO, Jakarta",
    card: "grid h-56 content-between rounded-xl border border-primary-line bg-primary-soft p-6 text-ink",
    meta: "text-sm text-muted",
  },
  {
    text: "Keyboard support was already there, so our audit came back clean.",
    name: "Sekar Ayu",
    role: "Designer, Yogyakarta",
    card: "grid h-56 content-between rounded-xl border border-line bg-subtle p-6 text-ink",
    meta: "text-sm text-muted",
  },
];
const quoteText = "text-lg font-medium";
const author = "font-semibold";
</script>

<template>
  <section tabindex="0" aria-label="Testimonials" :class="scroller">
    <div :class="intro">
      <h3 :class="title">Loved by teams across Indonesia</h3>
    </div>
    <StackingCards :top="0" :offset="24" :class="stack">
      <figure v-for="quote in quotes" :key="quote.name" :class="quote.card">
        <blockquote :class="quoteText">{{ quote.text }}</blockquote>
        <figcaption :class="quote.meta">
          <span :class="author">{{ quote.name }}</span
          >, {{ quote.role }}
        </figcaption>
      </figure>
    </StackingCards>
  </section>
</template>
