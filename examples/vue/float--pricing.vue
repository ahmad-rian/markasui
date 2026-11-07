<script setup lang="ts">
import Float from "../../components/float/Float.vue";

const stage = "grid place-items-center py-6";
const card = "relative w-72 rounded-xl border border-line bg-surface p-6";
const badgeWrap = "absolute -top-3 right-5";
const badge =
  "inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary";
const plan = "text-sm font-medium text-muted";
const price = "mt-2 text-3xl font-semibold text-ink tabular-nums";
const period = "text-sm font-normal text-muted";
const list = "mt-4 space-y-2 text-sm text-ink";
</script>

<template>
  <div :class="stage">
    <div :class="card">
      <Float motion="bob" :amplitude="6" :duration="3" :class="badgeWrap">
        <span :class="badge">Save 20%</span>
      </Float>
      <p :class="plan">Pro yearly</p>
      <p :class="price">Rp 79.000 <span :class="period">/ month</span></p>
      <ul :class="list">
        <li>Unlimited projects</li>
        <li>Priority support in Bahasa Indonesia</li>
        <li>Billed Rp 948.000 a year</li>
      </ul>
    </div>
  </div>
</template>
