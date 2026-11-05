<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

export type ContextMenuItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

type Offset = { x: number; y: number };

const props = withDefaults(
  defineProps<{
    items: ContextMenuItem[];
    menuLabel?: string;
    hintLabel?: string;
    id?: string;
  }>(),
  {
    menuLabel: "Context menu",
    hintLabel: "Press Shift+F10 to open the context menu",
    id: undefined,
  },
);
const emit = defineEmits<{ select: [value: string] }>();

const area =
  "block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const hint = "sr-only";
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

/** Letakkan menu di titik (relatif ke area), geser atau balik ke atas kalau tidak muat di layar. */
function placeMenu(target: HTMLElement, panel: HTMLElement, offset: Offset) {
  const anchor = target.getBoundingClientRect();
  const { width, height } = panel.getBoundingClientRect();
  const x = anchor.left + offset.x;
  const y = anchor.top + offset.y;
  const fitsBelow = y + height <= window.innerHeight - GAP;
  const top = fitsBelow ? y : Math.max(GAP, y - height);
  const left = Math.max(GAP, Math.min(x, window.innerWidth - width - GAP));
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

/** Shift+F10 dan tombol ContextMenu membuka menu dari keyboard. */
const isMenuKey = (event: KeyboardEvent) =>
  event.key === "ContextMenu" || (event.shiftKey && event.key === "F10");

const generatedId = useId();
const menuId = computed(() => props.id ?? generatedId);
const areaEl = useTemplateRef<HTMLDivElement>("areaRef");
const menuEl = useTemplateRef<HTMLDivElement>("menuRef");
const open = ref(false);
const state = computed(() => (open.value ? "open" : "closed"));
let offset: Offset = { x: 0, y: 0 };
let unfollow: (() => void) | undefined;

const menuItems = () =>
  Array.from(menuEl.value?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? []);

function focusItem(index: number) {
  const list = menuItems();
  if (list.length === 0) return;
  list[(index + list.length) % list.length]?.focus();
}

function place() {
  if (areaEl.value && menuEl.value)
    placeMenu(areaEl.value, menuEl.value, offset);
}

function openAt(next: Offset) {
  offset = next;
  // Tempatkan sinkron setelah showPopover; event toggle baru datang belakangan.
  if (!open.value) menuEl.value?.showPopover();
  place();
  focusItem(0);
}

function close() {
  menuEl.value?.hidePopover();
  areaEl.value?.focus();
}

function select(value: string) {
  emit("select", value);
  close();
}

function onContextMenu(event: MouseEvent) {
  event.preventDefault();
  const anchor = (event.currentTarget as HTMLElement).getBoundingClientRect();
  openAt({ x: event.clientX - anchor.left, y: event.clientY - anchor.top });
}

function onAreaKeydown(event: KeyboardEvent) {
  if (!isMenuKey(event)) return;
  event.preventDefault();
  openAt({ x: 0, y: 0 });
}

// beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
function onBeforeToggle(event: Event) {
  open.value = (event as ToggleEvent).newState === "open";
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function onToggle(event: Event) {
  stopFollowing();
  if ((event as ToggleEvent).newState !== "open") return;
  place();
  unfollow = followViewport(place);
  focusItem(0);
}

onBeforeUnmount(stopFollowing);

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
  <div class="contents">
    <div
      ref="areaRef"
      role="group"
      tabindex="0"
      :aria-describedby="`${menuId}-hint`"
      :data-state="state"
      :class="area"
      v-bind="$attrs"
      @contextmenu="onContextMenu"
      @keydown="onAreaKeydown"
    >
      <slot />
    </div>
    <span :id="`${menuId}-hint`" :class="hint">{{ props.hintLabel }}</span>
    <div
      :id="menuId"
      ref="menuRef"
      popover="auto"
      role="menu"
      :aria-label="props.menuLabel"
      :data-state="state"
      :class="menu"
      @beforetoggle="onBeforeToggle"
      @toggle="onToggle"
      @keydown="onMenuKeydown"
      @contextmenu.prevent
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
