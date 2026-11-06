<script setup lang="ts">
import ImageCompare from "../../components/image-compare/ImageCompare.vue";

const oldPanel = "grid h-60 content-start gap-3 bg-subtle px-5 pt-14";
const oldText = "text-sm text-muted";
const oldCards = "grid grid-cols-3 gap-2";
const oldCard = "h-12 border border-line bg-surface";
const oldChart = "flex h-16 items-end gap-1";
const oldBar = "w-6 bg-faint/40";
const newPanel = "grid h-60 content-start gap-5 bg-surface px-5 pt-14";
const newHeader = "flex items-baseline justify-between gap-4";
const newLabel = "text-sm text-muted";
const newValue = "flex items-baseline gap-2 text-2xl font-semibold text-ink";
const newBadge = "text-sm font-medium text-success";
const newChart = "flex h-20 items-end gap-2";
const newBar = "flex-1 rounded-t-md bg-primary/80";
const newLast = "flex-1 rounded-t-md bg-success";

const bars = ["h-[40%]", "h-[65%]", "h-[50%]", "h-[80%]", "h-[60%]", "h-[90%]"];
</script>

<template>
  <ImageCompare
    aria-label="Revenue widget redesign"
    before-label="Old"
    after-label="New"
  >
    <template #before>
      <div :class="oldPanel">
        <p :class="oldText">Revenue: 48210 USD</p>
        <div :class="oldCards">
          <div :class="oldCard"></div>
          <div :class="oldCard"></div>
          <div :class="oldCard"></div>
        </div>
        <div :class="oldChart">
          <div
            v-for="height in bars"
            :key="height"
            :class="`${oldBar} ${height}`"
          ></div>
        </div>
      </div>
    </template>
    <template #after>
      <div :class="newPanel">
        <div :class="newHeader">
          <p :class="newLabel">Revenue this month</p>
          <p :class="newValue">$48,210 <span :class="newBadge">+12%</span></p>
        </div>
        <div :class="newChart">
          <div
            v-for="(height, index) in bars"
            :key="height"
            :class="`${index === bars.length - 1 ? newLast : newBar} ${height}`"
          ></div>
        </div>
      </div>
    </template>
  </ImageCompare>
</template>
