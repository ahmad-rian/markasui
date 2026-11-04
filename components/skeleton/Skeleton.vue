<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    shape?: "rect" | "circle";
  }>(),
  { shape: "rect" },
);

const base = "animate-pulse bg-subtle motion-reduce:animate-none";
const shapes = {
  rect: "rounded-md",
  circle: "rounded-full",
};
</script>

<template>
  <div aria-hidden="true" :class="[base, shapes[props.shape]]" />
</template>
