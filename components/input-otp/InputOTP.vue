<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    length?: number;
    label?: string;
    name?: string;
    digitLabel?: string;
  }>(),
  {
    length: 6,
    label: undefined,
    name: undefined,
    digitLabel: "Digit {index} of {length}",
  },
);
const model = defineModel<string>({ default: "" });
const emit = defineEmits<{ complete: [value: string] }>();

const root = "m-0 min-w-0 border-0 p-0";
const legend = "mb-1.5 p-0 text-sm font-medium text-ink";
const group = "flex gap-2";
const box =
  "h-12 w-10 rounded-md border border-line bg-surface text-center text-lg font-medium text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

const NON_DIGIT = /\D/g;

/** Pecah nilai menjadi tepat `length` karakter; posisi kosong berisi "". */
const toChars = (value: string, length: number) =>
  Array.from({ length }, (_, index) => value[index] ?? "");

const formatDigitLabel = (template: string, index: number, length: number) =>
  template
    .replace("{index}", String(index + 1))
    .replace("{length}", String(length));

const groupEl = useTemplateRef<HTMLDivElement>("digits");
const chars = ref(toChars(model.value, props.length));
const joined = computed(() => chars.value.join(""));

// Nilai dari luar menang, kecuali sama dengan isi kotak saat ini (menjaga posisi kotak kosong).
watch([model, () => props.length], ([value, length]) => {
  if (value !== joined.value || chars.value.length !== length)
    chars.value = toChars(value, length);
});

function focusBox(index: number) {
  const target = groupEl.value?.children[index];
  if (target instanceof HTMLInputElement) target.focus();
}

function update(next: string[]) {
  const previous = joined.value;
  chars.value = next;
  const nextValue = next.join("");
  if (nextValue === previous) return;
  model.value = nextValue;
  if (next.every(Boolean)) emit("complete", nextValue);
}

/** Isi kotak mulai dari `start` dengan digit berurutan, lalu fokus ke kotak sesudahnya. */
function fill(start: number, digits: string) {
  update(
    chars.value.map((char, index) =>
      index >= start && index < start + digits.length
        ? (digits[index - start] ?? char)
        : char,
    ),
  );
  focusBox(Math.min(start + digits.length, props.length - 1));
}

const setChar = (index: number, char: string) =>
  update(chars.value.map((current, i) => (i === index ? char : current)));

function onInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const digits = target.value.replace(NON_DIGIT, "");
  if (digits === "") setChar(index, "");
  else fill(index, digits);
  // Vue tidak menimpa DOM kalau nilai reaktifnya tidak berubah, jadi samakan manual.
  target.value = chars.value[index] ?? "";
}

function onKeydown(index: number, event: KeyboardEvent) {
  const moves: Record<string, number | undefined> = {
    ArrowLeft: index - 1,
    ArrowRight: index + 1,
    Home: 0,
    End: props.length - 1,
  };
  const move = moves[event.key];
  if (move !== undefined) {
    event.preventDefault();
    return focusBox(move);
  }
  if (event.key === "Delete") {
    event.preventDefault();
    return setChar(index, "");
  }
  if (event.key !== "Backspace") return;
  event.preventDefault();
  if (chars.value[index] || index === 0) return setChar(index, "");
  setChar(index - 1, "");
  focusBox(index - 1);
}

function onPaste(index: number, event: ClipboardEvent) {
  event.preventDefault();
  const digits = (event.clipboardData?.getData("text") ?? "")
    .replace(NON_DIGIT, "")
    .slice(0, props.length);
  if (digits === "") return;
  fill(digits.length >= props.length ? 0 : index, digits);
}

const selectContent = (event: FocusEvent) =>
  (event.target as HTMLInputElement).select();
</script>

<template>
  <fieldset :class="root">
    <legend v-if="props.label" :class="legend">{{ props.label }}</legend>
    <div ref="digits" :class="group">
      <input
        v-for="(char, index) in chars"
        :key="index"
        type="text"
        inputmode="numeric"
        :autocomplete="index === 0 ? 'one-time-code' : 'off'"
        :aria-label="formatDigitLabel(props.digitLabel, index, props.length)"
        :value="char"
        :class="box"
        @input="onInput(index, $event)"
        @keydown="onKeydown(index, $event)"
        @paste="onPaste(index, $event)"
        @focus="selectContent"
      />
    </div>
    <input v-if="props.name" type="hidden" :name="props.name" :value="joined" />
  </fieldset>
</template>
