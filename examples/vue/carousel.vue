<script setup lang="ts">
import Carousel from "../../components/carousel/Carousel.vue";

const card = "flex h-40 flex-col justify-end rounded-xl bg-subtle p-5";
const title = "text-sm font-medium text-ink";
const text = "mt-1 text-sm text-muted";
</script>

<template>
  <Carousel label="Product tour" show-dots>
    <div :class="card">
      <p :class="title">Plan your week</p>
      <p :class="text">Drag tasks onto the calendar to block focus time.</p>
    </div>
    <div :class="card">
      <p :class="title">Share with your team</p>
      <p :class="text">Invite teammates and assign tasks in one click.</p>
    </div>
    <div :class="card">
      <p :class="title">Track progress</p>
      <p :class="text">See what shipped this week on a single dashboard.</p>
    </div>
  </Carousel>
</template>
