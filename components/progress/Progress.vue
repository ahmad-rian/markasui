<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value?: number | null;
    max?: number;
    label?: string;
    id?: string;
  }>(),
  { value: null, max: 100, label: undefined, id: undefined },
);

const wrapper = "grid gap-1.5";
const header = "flex items-center justify-between gap-4 text-sm";
const labelClass = "font-medium text-ink";
const valueClass = "text-muted tabular-nums";
const bar =
  "block h-2 w-full appearance-none overflow-hidden rounded-full border-0 bg-subtle [&::-webkit-progress-bar]:bg-subtle [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-200 [&::-webkit-progress-value]:ease-out [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary indeterminate:animate-pulse indeterminate:bg-primary/30 indeterminate:[&::-webkit-progress-bar]:bg-primary/30 motion-reduce:animate-none motion-reduce:[&::-webkit-progress-value]:transition-none";

const generatedId = useId();
const progressId = computed(() => props.id ?? generatedId);
const percent = computed(() =>
  props.value === null
    ? null
    : Math.min(100, Math.max(0, Math.round((props.value / props.max) * 100))),
);
</script>

<template>
  <div :class="wrapper">
    <div v-if="props.label" :class="header">
      <label :for="progressId" :class="labelClass">{{ props.label }}</label>
      <span v-if="percent !== null" :class="valueClass">{{ percent }}%</span>
    </div>
    <progress
      :id="progressId"
      :value="props.value ?? undefined"
      :max="props.max"
      :class="bar"
      v-bind="$attrs"
    />
  </div>
</template>
