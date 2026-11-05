<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, useTemplateRef } from "vue";

export type DropdownMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

type FocusTarget = "first" | "last";

const props = withDefaults(
  defineProps<{
    items: DropdownMenuItem[];
    label?: string;
    id?: string;
  }>(),
  { label: "Options", id: undefined },
);
const emit = defineEmits<{ select: [value: string] }>();

const root = "inline-block";
const triggerClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
const chevron = "size-4 text-muted";
const menu =
  "inset-auto m-0 min-w-48 rounded-lg border border-line bg-surface p-1 text-ink shadow-overlay";
const item =
  "flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const tones = {
  default: "text-ink hover:bg-subtle focus:bg-subtle",
  danger: "text-danger hover:bg-danger/10 focus:bg-danger/10",
};
const separator = "my-1 h-px bg-line";

const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?|mailto|tel):/i;

/** Href berskema selain http, https, mailto, dan tel (misalnya javascript:) diganti "#". */
const safeHref = (href: string) => {
  const cleaned = href.replace(/[\t\n\r]/g, "");
  const start = [...cleaned].findIndex((char) => char > " ");
  const value = cleaned.slice(Math.max(start, 0));
  return HAS_SCHEME.test(value) && !SAFE_SCHEME.test(value) ? "#" : href;
};

const GAP = 4;
const ITEM_SELECTOR = '[role="menuitem"]:not(:disabled)';

/** Letakkan menu di bawah pemicu rata kiri, pindah ke atas kalau tidak muat. */
function placeMenu(trigger: HTMLElement, panel: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const below = anchor.bottom + GAP;
  const above = anchor.top - GAP - height;
  const fitsBelow = below + height <= window.innerHeight;
  const top = fitsBelow || above < 0 ? below : above;
  const left = Math.max(
    GAP,
    Math.min(anchor.left, window.innerWidth - width - GAP),
  );
  panel.style.top = `${top}px`;
  panel.style.left = `${left}px`;
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

const generatedId = useId();
const menuId = computed(() => props.id ?? generatedId);
const triggerEl = useTemplateRef<HTMLButtonElement>("trigger");
const menuEl = useTemplateRef<HTMLDivElement>("menuRef");
const open = ref(false);
const state = computed(() => (open.value ? "open" : "closed"));
let focusTarget: FocusTarget = "first";
let unfollow: (() => void) | undefined;

const menuItems = () =>
  Array.from(menuEl.value?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);

function focusItem(index: number) {
  const list = menuItems();
  if (list.length === 0) return;
  list[(index + list.length) % list.length]?.focus();
}

const focusEdge = (target: FocusTarget) =>
  focusItem(target === "first" ? 0 : -1);

function close() {
  menuEl.value?.hidePopover();
  triggerEl.value?.focus();
}

function select(value: string) {
  emit("select", value);
  close();
}

// beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
function onBeforeToggle(event: Event) {
  open.value = (event as ToggleEvent).newState === "open";
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function place() {
  if (triggerEl.value && menuEl.value) placeMenu(triggerEl.value, menuEl.value);
}

function onToggle(event: Event) {
  stopFollowing();
  const isOpen = (event as ToggleEvent).newState === "open";
  if (!isOpen || !triggerEl.value || !menuEl.value) return;
  place();
  unfollow = followViewport(place);
  focusEdge(focusTarget);
  focusTarget = "first";
}

onBeforeUnmount(stopFollowing);

function onTriggerKeydown(event: KeyboardEvent) {
  const targets: Record<string, FocusTarget | undefined> = {
    ArrowDown: "first",
    ArrowUp: "last",
  };
  const target = targets[event.key];
  if (target === undefined) return;
  event.preventDefault();
  if (open.value) return focusEdge(target);
  focusTarget = target;
  menuEl.value?.showPopover();
}

function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    return close();
  }
  if (event.key === "Tab") return menuEl.value?.hidePopover();
  const index = menuItems().indexOf(document.activeElement as HTMLElement);
  const targets: Record<string, number | undefined> = {
    ArrowDown: index + 1,
    ArrowUp: index - 1,
    Home: 0,
    End: -1,
  };
  const target = targets[event.key];
  if (target === undefined) return;
  event.preventDefault();
  focusItem(target);
}
</script>

<template>
  <div :class="root">
    <button
      :id="`${menuId}-trigger`"
      ref="trigger"
      type="button"
      :popovertarget="menuId"
      aria-haspopup="menu"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="menuId"
      :data-state="state"
      :class="triggerClass"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger">{{ props.label }}</slot>
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
    </button>
    <div
      :id="menuId"
      ref="menuRef"
      popover="auto"
      role="menu"
      :aria-labelledby="`${menuId}-trigger`"
      :data-state="state"
      :class="menu"
      @beforetoggle="onBeforeToggle"
      @toggle="onToggle"
      @keydown="onMenuKeydown"
    >
      <template v-for="(entry, index) in props.items" :key="index">
        <div v-if="entry.separator" role="separator" :class="separator" />
        <a
          v-else-if="entry.href && !entry.disabled"
          :href="safeHref(entry.href)"
          role="menuitem"
          tabindex="-1"
          :class="[item, tones[entry.danger ? 'danger' : 'default']]"
          @click="select(entry.value ?? entry.label)"
          >{{ entry.label }}</a
        >
        <button
          v-else
          type="button"
          role="menuitem"
          tabindex="-1"
          :disabled="entry.disabled"
          :class="[item, tones[entry.danger ? 'danger' : 'default']]"
          @click="select(entry.value ?? entry.label)"
        >
          {{ entry.label }}
        </button>
      </template>
    </div>
  </div>
</template>
