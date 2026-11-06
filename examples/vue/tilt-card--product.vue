<script setup lang="ts">
import TiltCard from "../../components/tilt-card/TiltCard.vue";

const stage = "grid place-items-center py-6";
const card = "w-64 border border-line bg-surface p-4";
const image =
  "grid h-36 place-items-center rounded-lg bg-linear-to-br from-primary-soft to-warning/25 text-ink";
const icon = "size-14";
const title = "mt-4 text-base font-semibold text-ink";
const text = "mt-0.5 text-sm text-muted";
const row = "mt-4 flex items-center justify-between";
const price = "text-base font-semibold text-ink";
const button =
  "inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-on-primary transition-colors duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
</script>

<template>
  <div :class="stage">
    <TiltCard :max-angle="12" :class="card">
      <div data-depth="18" :class="image">
        <svg
          :class="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
          />
        </svg>
      </div>
      <p :class="title">Studio headphones</p>
      <p :class="text">Wireless, 40 hour battery</p>
      <div :class="row">
        <span :class="price">$129</span>
        <button type="button" :class="button">Add to cart</button>
      </div>
    </TiltCard>
  </div>
</template>
