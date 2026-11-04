<script setup lang="ts">
import { computed, useId } from "vue";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
};

const props = withDefaults(
  defineProps<{
    name: string;
    options: RadioOption[];
    label?: string;
    orientation?: "vertical" | "horizontal";
    id?: string;
  }>(),
  { label: undefined, id: undefined, orientation: "vertical" },
);
const model = defineModel<string>();

const root = "min-w-0";
const legendClass = "mb-3 text-sm font-medium text-ink";
const orientations = {
  vertical: "grid gap-3",
  horizontal: "flex flex-wrap gap-x-6 gap-y-3",
};
const item =
  "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative mt-0.5 flex size-4 shrink-0";
const radio =
  "peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
const dot =
  "pointer-events-none absolute inset-1 rounded-full bg-on-primary opacity-0 peer-checked:opacity-100";
const text = "grid gap-0.5";
const labelClass = "text-sm font-medium text-ink";
const descriptionClass = "text-sm text-muted";

const generatedId = useId();
const groupId = computed(() => props.id ?? generatedId);
</script>

<template>
  <fieldset :id="groupId" :class="root">
    <legend v-if="props.label" :class="legendClass">{{ props.label }}</legend>
    <div :class="orientations[props.orientation]">
      <div v-for="option in props.options" :key="option.value" :class="item">
        <span :class="control">
          <input
            :id="`${groupId}-${option.value}`"
            v-model="model"
            type="radio"
            :name="props.name"
            :value="option.value"
            :aria-describedby="
              option.description
                ? `${groupId}-${option.value}-description`
                : undefined
            "
            :class="radio"
          />
          <span :class="dot" aria-hidden="true" />
        </span>
        <div :class="text">
          <label :for="`${groupId}-${option.value}`" :class="labelClass">{{
            option.label
          }}</label>
          <p
            v-if="option.description"
            :id="`${groupId}-${option.value}-description`"
            :class="descriptionClass"
          >
            {{ option.description }}
          </p>
        </div>
      </div>
    </div>
  </fieldset>
</template>
