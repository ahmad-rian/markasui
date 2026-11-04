<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
}>();
const model = defineModel<string | number>();

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const describedBy = computed(() =>
  props.error
    ? `${inputId.value}-error`
    : props.hint
      ? `${inputId.value}-hint`
      : undefined,
);
</script>

<template>
  <div :class="wrapper">
    <label v-if="props.label" :for="inputId" :class="labelClass">{{
      props.label
    }}</label>
    <input
      :id="inputId"
      v-model="model"
      type="text"
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :class="field"
      v-bind="$attrs"
    />
    <p v-if="props.error" :id="`${inputId}-error`" :class="errorClass">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" :class="hintClass">
      {{ props.hint }}
    </p>
  </div>
</template>
