<script setup lang="ts">
import Marquee from "../../components/marquee/Marquee.vue";

const first = ["Accordion", "Avatar", "Badge", "Button", "Card", "Carousel"];
const second = ["Modal", "Popover", "Select", "Slider", "Tabs", "Tooltip"];
const chip =
  "rounded-lg bg-subtle px-3 py-1.5 text-sm whitespace-nowrap text-ink";
</script>

<template>
  <div class="flex flex-col gap-3">
    <Marquee :duration="25">
      <span v-for="name in first" :key="name" :class="chip">{{ name }}</span>
    </Marquee>
    <Marquee :duration="25" reverse>
      <span v-for="name in second" :key="name" :class="chip">{{ name }}</span>
    </Marquee>
  </div>
</template>
