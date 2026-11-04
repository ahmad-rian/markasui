<script setup lang="ts">
import { computed, onMounted, useId, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
}>();
const model = defineModel<string>();

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pr-9 pl-3 text-sm text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const icon =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const generatedId = useId();
const selectId = computed(() => props.id ?? generatedId);
// Tanpa v-model, Vue mengosongkan <select>. Samakan dengan Blade dan React:
// pakai opsi yang ditandai selected, atau opsi pertama, seperti perilaku native.
const select = useTemplateRef<HTMLSelectElement>("select");
onMounted(() => {
  if (model.value !== undefined || !select.value) return;
  const options = [...select.value.options];
  const initial =
    options.find((option) => option.defaultSelected) ?? options[0];
  if (initial) model.value = initial.value;
});

const describedBy = computed(() =>
  props.error
    ? `${selectId.value}-error`
    : props.hint
      ? `${selectId.value}-hint`
      : undefined,
);
</script>

<template>
  <div :class="wrapper">
    <label v-if="props.label" :for="selectId" :class="labelClass">{{
      props.label
    }}</label>
    <div :class="control">
      <select
        :id="selectId"
        ref="select"
        v-model="model"
        :aria-invalid="props.error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :class="field"
        v-bind="$attrs"
      >
        <slot />
      </select>
      <svg
        :class="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
    <p v-if="props.error" :id="`${selectId}-error`" :class="errorClass">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${selectId}-hint`" :class="hintClass">
      {{ props.hint }}
    </p>
  </div>
</template>
