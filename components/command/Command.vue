<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useTemplateRef,
  watch,
} from "vue";

defineOptions({ inheritAttrs: false });

export type CommandItem = {
  group: string;
  label: string;
  value?: string;
  href?: string;
  shortcut?: string;
};

type Entry = { item: CommandItem; index: number };

const props = withDefaults(
  defineProps<{
    items: CommandItem[];
    hotkey?: boolean;
    placeholderLabel?: string;
    emptyLabel?: string;
    searchLabel?: string;
    dialogLabel?: string;
    id?: string;
  }>(),
  {
    hotkey: false,
    placeholderLabel: "Type a command or search...",
    emptyLabel: "No results found.",
    searchLabel: "Search commands",
    dialogLabel: "Command palette",
    id: undefined,
  },
);
const emit = defineEmits<{ select: [value: string] }>();

const dialogClass =
  "mx-auto mt-24 mb-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const search = "flex items-center gap-2 border-b border-line px-4";
const searchIcon = "size-4 shrink-0 text-muted";
const input =
  "h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted";
const list = "max-h-72 overflow-y-auto p-1";
const groupClass = "py-1";
const heading = "px-3 pt-1 pb-1.5 text-xs font-medium text-muted";
const option =
  "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-sm text-ink transition-colors duration-150 ease-out aria-selected:bg-subtle motion-reduce:transition-none";
const shortcutClass = "font-sans text-xs text-muted";
const empty = "px-4 py-6 text-center text-sm text-muted";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

/** Nama grup sesuai urutan kemunculan pertama. */
const groupNames = (items: CommandItem[]) => [
  ...new Set(items.map((entry) => entry.group)),
];

const matches = (item: CommandItem, query: string) =>
  item.label.toLowerCase().includes(query.trim().toLowerCase());

const generatedId = useId();
const dialogId = computed(() => props.id ?? generatedId);
const listId = computed(() => `${dialogId.value}-list`);
const optionId = (index: number) => `${dialogId.value}-option-${index}`;
const dialog = useTemplateRef<HTMLDialogElement>("dialog");
const open = ref(false);
const query = ref("");
const active = ref(0);

const groups = computed(() =>
  groupNames(props.items).map((name, groupIndex) => ({
    name,
    id: `${dialogId.value}-group-${groupIndex}`,
    entries: props.items
      .map((item, index): Entry => ({ item, index }))
      .filter((entry) => entry.item.group === name)
      .filter((entry) => matches(entry.item, query.value)),
  })),
);
const visible = computed(() => groups.value.flatMap((group) => group.entries));
const activeId = computed(() => {
  const entry = visible.value[Math.min(active.value, visible.value.length - 1)];
  return entry ? optionId(entry.index) : undefined;
});

function show() {
  dialog.value?.showModal();
  open.value = true;
}

function onHotkey(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k")
    return;
  event.preventDefault();
  if (dialog.value?.open) return dialog.value.close();
  show();
}

onMounted(() => {
  if (props.hotkey) window.addEventListener("keydown", onHotkey);
});
onBeforeUnmount(() => window.removeEventListener("keydown", onHotkey));

watch(activeId, async (id) => {
  if (!id) return;
  await nextTick();
  document.getElementById(id)?.scrollIntoView?.({ block: "nearest" });
});

function select(value: string) {
  emit("select", value);
  dialog.value?.close();
}

function onClose() {
  open.value = false;
  query.value = "";
  active.value = 0;
}

function onInput(event: Event) {
  query.value = (event.target as HTMLInputElement).value;
  active.value = 0;
}

function onKeydown(event: KeyboardEvent) {
  const count = visible.value.length;
  const steps: Record<string, number | undefined> = {
    ArrowDown: 1,
    ArrowUp: -1,
  };
  const step = steps[event.key];
  if (step !== undefined) {
    event.preventDefault();
    if (count > 0) active.value = (active.value + step + count) % count;
    return;
  }
  if (event.key !== "Enter" || !activeId.value) return;
  event.preventDefault();
  document.getElementById(activeId.value)?.click();
}
</script>

<template>
  <div class="contents">
    <div v-if="$slots.trigger" class="contents" @click="show">
      <slot name="trigger" />
    </div>
    <dialog
      :id="dialogId"
      ref="dialog"
      :aria-label="props.dialogLabel"
      :data-state="open ? 'open' : 'closed'"
      :class="dialogClass"
      v-bind="$attrs"
      @close="onClose"
      @click.self="dialog?.close()"
    >
      <div :class="search">
        <svg
          :class="searchIcon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          role="combobox"
          :aria-label="props.searchLabel"
          :aria-expanded="visible.length > 0 ? 'true' : 'false'"
          :aria-controls="listId"
          aria-autocomplete="list"
          :aria-activedescendant="activeId"
          autocomplete="off"
          spellcheck="false"
          :placeholder="props.placeholderLabel"
          :value="query"
          :class="input"
          @input="onInput"
          @keydown="onKeydown"
        />
      </div>
      <div
        :id="listId"
        role="listbox"
        :aria-label="props.dialogLabel"
        :hidden="visible.length === 0"
        :class="list"
      >
        <template v-for="group in groups" :key="group.id">
          <div
            v-if="group.entries.length > 0"
            role="group"
            :aria-labelledby="`${group.id}-heading`"
            :class="groupClass"
          >
            <div :id="`${group.id}-heading`" :class="heading">
              {{ group.name }}
            </div>
            <component
              :is="entry.item.href ? 'a' : 'div'"
              v-for="entry in group.entries"
              :id="optionId(entry.index)"
              :key="entry.index"
              :href="entry.item.href ? safeHref(entry.item.href) : undefined"
              role="option"
              :aria-selected="
                optionId(entry.index) === activeId ? 'true' : 'false'
              "
              tabindex="-1"
              :class="option"
              @mousemove="active = visible.indexOf(entry)"
              @click="select(entry.item.value ?? entry.item.label)"
            >
              <span>{{ entry.item.label }}</span>
              <kbd v-if="entry.item.shortcut" :class="shortcutClass">{{
                entry.item.shortcut
              }}</kbd>
            </component>
          </div>
        </template>
      </div>
      <p v-if="visible.length === 0" :class="empty">{{ props.emptyLabel }}</p>
    </dialog>
  </div>
</template>
