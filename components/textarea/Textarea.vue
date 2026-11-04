<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    id?: string;
    rows?: number;
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    id: undefined,
    rows: 4,
  },
);
const model = defineModel<string>();

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "block w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const generatedId = useId();
const textareaId = computed(() => props.id ?? generatedId);
const describedBy = computed(() =>
  props.error
    ? `${textareaId.value}-error`
    : props.hint
      ? `${textareaId.value}-hint`
      : undefined,
);
</script>

<template>
  <div :class="wrapper">
    <label v-if="props.label" :for="textareaId" :class="labelClass">{{
      props.label
    }}</label>
    <textarea
      :id="textareaId"
      v-model="model"
      :rows="props.rows"
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-describedby="describedBy"
      :class="field"
      v-bind="$attrs"
    />
    <p v-if="props.error" :id="`${textareaId}-error`" :class="errorClass">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${textareaId}-hint`" :class="hintClass">
      {{ props.hint }}
    </p>
  </div>
</template>
