<script setup lang="ts">
import { computed, ref } from "vue";

export type ToggleGroupItem = {
  value: string;
  label: string;
  ariaLabel?: string;
};

const props = withDefaults(
  defineProps<{
    items: ToggleGroupItem[];
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    label?: string;
  }>(),
  { type: "single", defaultValue: undefined, label: undefined },
);
const model = defineModel<string | string[]>();

const root = "inline-flex items-center gap-1 rounded-lg bg-subtle p-1";
const item =
  "inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=on]:bg-surface data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

const toArray = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value : value ? [value] : [];

const focused = ref<string>();
const selected = computed(() => toArray(model.value ?? props.defaultValue));
const tabStop = computed(
  () => focused.value ?? selected.value[0] ?? props.items[0]?.value,
);

function toggle(key: string) {
  focused.value = key;
  const isOn = selected.value.includes(key);
  const wanted = isOn
    ? selected.value.filter((entry) => entry !== key)
    : props.type === "multiple"
      ? [...selected.value, key]
      : [key];
  const next = props.items
    .map((entry) => entry.value)
    .filter((entry) => wanted.includes(entry));
  model.value = props.type === "multiple" ? next : (next[0] ?? "");
}

function onKeydown(event: KeyboardEvent) {
  const step = STEPS[event.key];
  if (step === undefined) return;
  event.preventDefault();
  const group = event.currentTarget as HTMLElement;
  const buttons = Array.from(
    group.querySelectorAll<HTMLButtonElement>(":scope > button"),
  );
  const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
  const target = buttons[(index + step + buttons.length) % buttons.length];
  if (!target) return;
  focused.value = target.dataset.value;
  target.focus();
}
</script>

<template>
  <div
    role="group"
    :aria-label="props.label"
    :class="root"
    @keydown="onKeydown"
  >
    <button
      v-for="entry in props.items"
      :key="entry.value"
      type="button"
      :data-value="entry.value"
      :aria-pressed="selected.includes(entry.value) ? 'true' : 'false'"
      :data-state="selected.includes(entry.value) ? 'on' : 'off'"
      :tabindex="entry.value === tabStop ? 0 : -1"
      :aria-label="entry.ariaLabel"
      :class="item"
      @click="toggle(entry.value)"
    >
      <slot :name="entry.value">{{ entry.label }}</slot>
    </button>
  </div>
</template>
