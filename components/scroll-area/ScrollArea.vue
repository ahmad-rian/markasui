<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    orientation?: "vertical" | "horizontal" | "both";
    label?: string;
  }>(),
  { orientation: "vertical", label: "Scrollable content" },
);

const base =
  "rounded-lg [scrollbar-color:var(--markas-line)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-track]:bg-transparent";
const orientations = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
};
</script>

<template>
  <div
    role="region"
    :aria-label="props.label"
    tabindex="0"
    :data-orientation="props.orientation"
    :class="[base, orientations[props.orientation]]"
  >
    <slot />
  </div>
</template>
