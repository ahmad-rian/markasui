<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    showValue?: boolean;
    id?: string;
  }>(),
  {
    label: undefined,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: undefined,
    showValue: true,
    id: undefined,
  },
);
const model = defineModel<number>();

const root = "group grid gap-3 has-disabled:cursor-not-allowed";
const header = "flex items-center justify-between gap-4 text-sm";
const labelClass = "font-medium text-ink group-has-disabled:opacity-50";
const valueClass =
  "ml-auto text-muted tabular-nums group-has-disabled:text-faint";
const range =
  "h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface";

const generatedId = useId();
const sliderId = computed(() => props.id ?? generatedId);
const current = computed(() => model.value ?? props.defaultValue ?? props.min);
const percent = computed(() =>
  props.max > props.min
    ? ((current.value - props.min) / (props.max - props.min)) * 100
    : 0,
);

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).valueAsNumber;
}
</script>

<template>
  <div :class="root">
    <div v-if="props.label || props.showValue" :class="header">
      <label v-if="props.label" :for="sliderId" :class="labelClass">{{
        props.label
      }}</label>
      <span v-if="props.showValue" :class="valueClass" aria-hidden="true">{{
        current
      }}</span>
    </div>
    <input
      :id="sliderId"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="current"
      :style="{ '--value': `${percent}%` }"
      :class="range"
      v-bind="$attrs"
      type="range"
      @input="onInput"
    />
  </div>
</template>
