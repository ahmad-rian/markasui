<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  useId,
  useTemplateRef,
  watch,
} from "vue";

export type ComboboxOption = { value: string; label: string };

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    options: ComboboxOption[];
    label?: string;
    hint?: string;
    error?: string;
    name?: string;
    emptyLabel?: string;
    id?: string;
  }>(),
  {
    label: undefined,
    hint: undefined,
    error: undefined,
    name: undefined,
    emptyLabel: "No results",
    id: undefined,
  },
);
const model = defineModel<string>({ default: "" });

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full rounded-md border border-line bg-surface ps-3 pe-9 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const chevron =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const panel =
  "inset-auto m-0 max-h-60 overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const optionClass =
  "flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-ink hover:bg-subtle aria-selected:bg-subtle";
const check = "size-4 shrink-0 text-primary";
const emptyClass = "px-3 py-2 text-sm text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

const GAP = 4;

/** Letakkan daftar di bawah input selebar input, pindah ke atas kalau tidak muat. */
function placeList(anchorEl: HTMLElement, panelEl: HTMLElement) {
  const anchor = anchorEl.getBoundingClientRect();
  panelEl.style.width = `${anchor.width}px`;
  const { height } = panelEl.getBoundingClientRect();
  const below = anchor.bottom + GAP;
  const above = anchor.top - GAP - height;
  const fitsBelow = below + height <= window.innerHeight;
  panelEl.style.top = `${fitsBelow || above < 0 ? below : above}px`;
  panelEl.style.left = `${anchor.left}px`;
}

/** Jalankan ulang penempatan saat halaman digulir atau jendela berubah ukuran. Mengembalikan fungsi pelepas. */
function followViewport(update: () => void) {
  const scrollOptions = { capture: true, passive: true };
  window.addEventListener("scroll", update, scrollOptions);
  window.addEventListener("resize", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update, scrollOptions);
    window.removeEventListener("resize", update);
  };
}

/** Indeks opsi (di daftar asli) yang labelnya memuat teks filter. */
const matchingIndexes = (options: ComboboxOption[], filter: string) => {
  const query = filter.trim().toLowerCase();
  return options.flatMap((option, index) =>
    option.label.toLowerCase().includes(query) ? [index] : [],
  );
};

const labelOf = (options: ComboboxOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? "";

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const listId = computed(() => `${inputId.value}-listbox`);
const inputEl = useTemplateRef<HTMLInputElement>("input");
const panelEl = useTemplateRef<HTMLDivElement>("popup");
const text = ref(labelOf(props.options, model.value));
const filter = ref("");
const active = ref(-1);
const open = ref(false);
let lastValue = model.value;
let unfollow: (() => void) | undefined;

const visible = computed(() => matchingIndexes(props.options, filter.value));
const describedBy = computed(() =>
  props.error
    ? `${inputId.value}-error`
    : props.hint
      ? `${inputId.value}-hint`
      : undefined,
);
const optionId = (index: number) => `${inputId.value}-option-${index}`;

// Nilai v-model yang berubah dari luar menyamakan teks input.
watch(model, (value) => {
  if (value === lastValue) return;
  lastValue = value;
  text.value = labelOf(props.options, value);
});

watch(active, async (index) => {
  if (index < 0) return;
  await nextTick();
  document.getElementById(optionId(index))?.scrollIntoView?.({
    block: "nearest",
  });
});

function commit(next: string) {
  if (next === model.value) return;
  lastValue = next;
  model.value = next;
}

function show() {
  if (!open.value) panelEl.value?.showPopover();
}

function hide() {
  active.value = -1;
  if (open.value) panelEl.value?.hidePopover();
}

function select(index: number) {
  const option = props.options[index];
  if (!option) return;
  commit(option.value);
  text.value = option.label;
  filter.value = "";
  hide();
}

function move(step: 1 | -1) {
  const list = visible.value;
  if (list.length === 0) return;
  const position = list.indexOf(active.value);
  const next =
    position === -1
      ? step === 1
        ? 0
        : list.length - 1
      : (position + step + list.length) % list.length;
  active.value = list[next] ?? -1;
}

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  text.value = value;
  filter.value = value;
  active.value = -1;
  commit("");
  show();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    if (open.value) return move(step);
    show();
    const list = visible.value;
    active.value = (step === 1 ? list[0] : list[list.length - 1]) ?? -1;
    return;
  }
  if (event.key === "Enter" && open.value && active.value >= 0) {
    event.preventDefault();
    return select(active.value);
  }
  if (event.key !== "Escape") return;
  event.preventDefault();
  if (open.value) return hide();
  text.value = "";
  filter.value = "";
  commit("");
}

function place() {
  if (inputEl.value && panelEl.value) placeList(inputEl.value, panelEl.value);
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

// beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
function onBeforeToggle(event: Event) {
  open.value = (event as ToggleEvent).newState === "open";
}

function onToggle(event: Event) {
  stopFollowing();
  if ((event as ToggleEvent).newState !== "open") return;
  place();
  unfollow = followViewport(place);
}

onBeforeUnmount(stopFollowing);
</script>

<template>
  <div :class="wrapper">
    <label
      v-if="props.label"
      :id="`${inputId}-label`"
      :for="inputId"
      :class="labelClass"
      >{{ props.label }}</label
    >
    <div :class="control">
      <input
        :id="inputId"
        ref="input"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="listId"
        :aria-activedescendant="active >= 0 ? optionId(active) : undefined"
        :aria-invalid="props.error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :data-state="open ? 'open' : 'closed'"
        :class="field"
        v-bind="$attrs"
        :value="text"
        @input="onInput"
        @keydown="onKeydown"
        @blur="hide"
        @click="show"
      />
      <svg
        :class="chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
    <input v-if="props.name" type="hidden" :name="props.name" :value="model" />
    <div
      :id="`${inputId}-popup`"
      ref="popup"
      popover="manual"
      :data-state="open ? 'open' : 'closed'"
      :class="panel"
      @beforetoggle="onBeforeToggle"
      @toggle="onToggle"
      @mousedown.prevent
    >
      <ul
        :id="listId"
        role="listbox"
        :aria-labelledby="props.label ? `${inputId}-label` : undefined"
      >
        <li
          v-for="index in visible"
          :id="optionId(index)"
          :key="index"
          role="option"
          :aria-selected="index === active ? 'true' : 'false'"
          :data-state="
            props.options[index]?.value === model && model !== ''
              ? 'checked'
              : 'unchecked'
          "
          :class="optionClass"
          @click="select(index)"
        >
          {{ props.options[index]?.label }}
          <svg
            v-if="props.options[index]?.value === model && model !== ''"
            :class="check"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
        </li>
      </ul>
      <p v-if="visible.length === 0" :class="emptyClass">
        {{ props.emptyLabel }}
      </p>
    </div>
    <p v-if="props.error" :id="`${inputId}-error`" :class="errorClass">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" :class="hintClass">
      {{ props.hint }}
    </p>
  </div>
</template>
