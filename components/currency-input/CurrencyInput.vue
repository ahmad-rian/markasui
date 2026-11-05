<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from "vue";

defineOptions({ inheritAttrs: false });

/** Separators and short units per currency. IDR follows id-ID, USD follows en-US. */
const CURRENCIES = {
  IDR: {
    symbol: "Rp",
    group: ".",
    decimal: ",",
    fraction: 0,
    short: "",
    units: [
      [1e6, "jt"],
      [1e3, "rb"],
    ],
  },
  USD: {
    symbol: "$",
    group: ",",
    decimal: ".",
    fraction: 2,
    short: "$",
    units: [
      [1e6, "M"],
      [1e3, "K"],
    ],
  },
} as const;
type Currency = (typeof CURRENCIES)[keyof typeof CURRENCIES];

const props = withDefaults(
  defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    currency?: keyof typeof CURRENCIES;
    min?: number;
    max?: number;
    /** Quick amount chips below the field. */
    presets?: number[];
    presetsLabel?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    currency: "IDR",
    min: undefined,
    max: undefined,
    presets: () => [],
    presetsLabel: "Quick amounts",
    name: undefined,
    id: undefined,
    disabled: false,
  },
);
const model = defineModel<number | null>({ default: null });

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control =
  "flex h-11 w-full items-center gap-2 rounded-md border border-line bg-surface px-3 text-base transition-colors duration-150 ease-out has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-subtle has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[[aria-invalid=true]]:border-danger motion-reduce:transition-none";
const prefix = "shrink-0 font-medium text-muted select-none";
const field =
  "h-full min-w-0 flex-1 bg-transparent font-medium text-ink tabular-nums outline-none placeholder:text-faint disabled:cursor-not-allowed disabled:text-muted";
const chips = "flex flex-wrap gap-2 pt-1";
const chip =
  "inline-flex h-8 items-center rounded-full border border-line bg-surface px-3 text-sm font-medium text-ink tabular-nums transition-[background-color,border-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 aria-pressed:border-primary aria-pressed:bg-primary-soft motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const COUNT_MS = 400;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const groupDigits = (digits: string, c: Currency) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, c.group);

/** 12500000 -> "12.500.000". Decimals show only when they are not zero. */
function formatAmount(value: number, c: Currency) {
  const [int = "0", frac = ""] = Math.abs(value).toFixed(c.fraction).split(".");
  return groupDigits(int, c) + (/[1-9]/.test(frac) ? c.decimal + frac : "");
}

/** 50000 -> "50rb", 1500000 -> "1,5jt", 1000 USD -> "$1K". */
function shortAmount(value: number, c: Currency) {
  const unit = c.units.find(([size]) => value >= size);
  if (!unit) return c.short + formatAmount(value, c);
  const scaled = String(Number((value / unit[0]).toFixed(1)));
  return c.short + scaled.replace(".", c.decimal) + unit[1];
}

/** Typed text -> clean grouped text and its number (null when empty). */
function parseTyped(raw: string, c: Currency) {
  const [head = "", ...tail] = c.fraction ? raw.split(c.decimal) : [raw];
  const int = head.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  const hasDecimal = tail.length > 0;
  const frac = tail.join("").replace(/\D/g, "").slice(0, c.fraction);
  if (!int && !hasDecimal) return { text: "", value: null };
  const whole = int || "0";
  return {
    text: groupDigits(whole, c) + (hasDecimal ? c.decimal + frac : ""),
    value: Number(`${whole}.${frac || "0"}`),
  };
}

/** Digits (and the decimal mark) are what the caret position is counted in. */
const significant = (text: string, c: Currency) =>
  [...text].filter(
    (ch) => /\d/.test(ch) || (c.fraction > 0 && ch === c.decimal),
  ).length;

function caretAfter(text: string, count: number, c: Currency) {
  let position = 0;
  for (let seen = 0; position < text.length && seen < count; position++)
    if (significant(text[position] ?? "", c)) seen++;
  return position;
}

const c = computed(() => CURRENCIES[props.currency]);
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const currencyId = computed(() => `${inputId.value}-currency`);
const describedBy = computed(() =>
  [
    currencyId.value,
    props.error
      ? `${inputId.value}-error`
      : props.hint
        ? `${inputId.value}-hint`
        : undefined,
  ]
    .filter(Boolean)
    .join(" "),
);

const text = ref(
  model.value === null ? "" : formatAmount(model.value, c.value),
);
let frame = 0;
let own: number | null = model.value;
onBeforeUnmount(() => cancelAnimationFrame(frame));

// Values set from outside (v-model) reformat the field; our own updates are skipped.
watch(model, (next) => {
  if (next === own) return;
  own = next;
  cancelAnimationFrame(frame);
  text.value = next === null ? "" : formatAmount(next, c.value);
});

const clamp = (n: number) =>
  Math.min(Math.max(n, props.min ?? -Infinity), props.max ?? Infinity);
function commit(next: number | null) {
  own = next;
  model.value = next;
}

function onInput(event: Event) {
  cancelAnimationFrame(frame);
  const input = event.target as HTMLInputElement;
  const count = significant(
    input.value.slice(0, input.selectionStart ?? input.value.length),
    c.value,
  );
  const parsed = parseTyped(input.value, c.value);
  // Write the formatted text first so the caret can be placed before Vue re-renders.
  input.value = parsed.text;
  const position = caretAfter(parsed.text, count, c.value);
  input.setSelectionRange(position, position);
  text.value = parsed.text;
  commit(parsed.value);
}

/** Backspace or Delete next to a separator removes the digit behind it instead. */
function onKeydown(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  const at = input.selectionStart;
  if (at === null || at !== input.selectionEnd) return;
  if (event.key === "Backspace" && input.value[at - 1] === c.value.group)
    input.setSelectionRange(at - 1, at - 1);
  if (event.key === "Delete" && input.value[at] === c.value.group)
    input.setSelectionRange(at + 1, at + 1);
}

function onBlur() {
  if (model.value === null) return;
  const next = clamp(model.value);
  text.value = formatAmount(next, c.value);
  if (next !== model.value) commit(next);
}

/** Jump to a preset, counting the digits up or down on the way. */
function pick(preset: number) {
  const target = clamp(preset);
  const from = model.value ?? 0;
  commit(target);
  cancelAnimationFrame(frame);
  if (reducedMotion() || typeof requestAnimationFrame !== "function") {
    text.value = formatAmount(target, c.value);
    return;
  }
  let start: number | undefined;
  const tick = (now: number) => {
    start ??= now;
    const t = Math.min((now - start) / COUNT_MS, 1);
    const eased = 1 - (1 - t) ** 3;
    const step = 10 ** c.value.fraction;
    text.value = formatAmount(
      Math.round((from + (target - from) * eased) * step) / step,
      c.value,
    );
    if (t < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
}
</script>

<template>
  <div :class="wrapper">
    <label v-if="props.label" :for="inputId" :class="labelClass">{{
      props.label
    }}</label>
    <div :class="control">
      <span :id="currencyId" :class="prefix">{{ c.symbol }}</span>
      <input
        :id="inputId"
        type="text"
        :inputmode="c.fraction ? 'decimal' : 'numeric'"
        autocomplete="off"
        :value="text"
        :disabled="props.disabled"
        :aria-invalid="props.error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :class="field"
        v-bind="$attrs"
        @input="onInput"
        @keydown="onKeydown"
        @blur="onBlur"
      />
    </div>
    <input
      v-if="props.name"
      type="hidden"
      :name="props.name"
      :value="model ?? ''"
    />
    <p v-if="props.error" :id="`${inputId}-error`" :class="errorClass">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" :class="hintClass">
      {{ props.hint }}
    </p>
    <div
      v-if="props.presets.length > 0"
      role="group"
      :aria-label="props.presetsLabel"
      :class="chips"
    >
      <button
        v-for="preset in props.presets"
        :key="preset"
        type="button"
        :aria-pressed="model === preset ? 'true' : 'false'"
        :disabled="props.disabled"
        :class="chip"
        @click="pick(preset)"
      >
        {{ shortAmount(preset, c) }}
      </button>
    </div>
  </div>
</template>
