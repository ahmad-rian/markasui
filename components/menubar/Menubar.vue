<script setup lang="ts">
import { onBeforeUnmount, ref, useId, useTemplateRef } from "vue";

export type MenubarItem =
  | { separator: true }
  | {
      separator?: false;
      label: string;
      value?: string;
      href?: string;
      danger?: boolean;
      disabled?: boolean;
    };

export type MenubarMenu = { label: string; items: MenubarItem[] };

type FocusTarget = "first" | "last";

const props = withDefaults(
  defineProps<{
    menus: MenubarMenu[];
    label?: string;
    id?: string;
  }>(),
  { label: "Menu", id: undefined },
);
const emit = defineEmits<{ select: [value: string] }>();

const bar =
  "inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1";
const wrapper = "contents";
const triggerClass =
  "inline-flex h-8 items-center rounded-md px-3 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
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
const TRIGGER_SELECTOR = ':scope > [role="none"] > [role="menuitem"]';
const MENU_SELECTOR = ':scope > [role="none"] > [role="menu"]';
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

const wrap = (index: number, length: number) => (index + length) % length;

const generatedId = useId();
const baseId = props.id ?? generatedId;
const barEl = useTemplateRef<HTMLDivElement>("barRef");
const openIndex = ref<number | null>(null);
const activeIndex = ref(0);
let focusTarget: FocusTarget = "first";
let unfollow: (() => void) | undefined;

const triggers = () =>
  Array.from(
    barEl.value?.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR) ?? [],
  );
const panels = () =>
  Array.from(barEl.value?.querySelectorAll<HTMLElement>(MENU_SELECTOR) ?? []);
const menuItems = (index: number) =>
  Array.from(
    panels()[index]?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [],
  );

function focusItem(menuIndex: number, index: number) {
  const list = menuItems(menuIndex);
  if (list.length === 0) return;
  list[wrap(index, list.length)]?.focus();
}

const focusEdge = (menuIndex: number, target: FocusTarget) =>
  focusItem(menuIndex, target === "first" ? 0 : -1);

function focusTrigger(index: number) {
  const next = wrap(index, props.menus.length);
  activeIndex.value = next;
  triggers()[next]?.focus();
  return next;
}

function openMenu(index: number, target: FocusTarget) {
  focusTarget = target;
  panels()[index]?.showPopover();
}

function close(index: number) {
  panels()[index]?.hidePopover();
  triggers()[index]?.focus();
}

/** Tutup menu sekarang, pindah ke menu di sebelahnya, lalu buka. */
function switchMenu(from: number, to: number) {
  panels()[from]?.hidePopover();
  openMenu(focusTrigger(to), "first");
}

function select(index: number, value: string) {
  emit("select", value);
  close(index);
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function place(index: number) {
  const trigger = triggers()[index];
  const panel = panels()[index];
  if (trigger && panel) placeMenu(trigger, panel);
}

// beforetoggle berjalan sinkron, jadi status selalu terbaru untuk tombol berikutnya.
function onBeforeToggle(index: number, event: Event) {
  if ((event as ToggleEvent).newState === "open") {
    openIndex.value = index;
    activeIndex.value = index;
    return;
  }
  if (openIndex.value === index) openIndex.value = null;
}

function onToggle(index: number, event: Event) {
  if ((event as ToggleEvent).newState !== "open") {
    if (openIndex.value === null) stopFollowing();
    return;
  }
  stopFollowing();
  place(index);
  unfollow = followViewport(() => place(index));
  focusEdge(index, focusTarget);
  focusTarget = "first";
}

onBeforeUnmount(stopFollowing);

function onTriggerKeydown(index: number, event: KeyboardEvent) {
  const moves: Record<string, number | undefined> = {
    ArrowRight: index + 1,
    ArrowLeft: index - 1,
    Home: 0,
    End: -1,
  };
  const move = moves[event.key];
  if (move !== undefined) {
    event.preventDefault();
    focusTrigger(move);
    return;
  }
  const targets: Record<string, FocusTarget | undefined> = {
    ArrowDown: "first",
    ArrowUp: "last",
  };
  const target = targets[event.key];
  if (target === undefined) return;
  event.preventDefault();
  if (openIndex.value === index) return focusEdge(index, target);
  openMenu(index, target);
}

function onMenuKeydown(index: number, event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    return close(index);
  }
  if (event.key === "Tab") return panels()[index]?.hidePopover();
  const sideways: Record<string, number | undefined> = {
    ArrowRight: index + 1,
    ArrowLeft: index - 1,
  };
  const side = sideways[event.key];
  if (side !== undefined) {
    event.preventDefault();
    return switchMenu(index, side);
  }
  const current = menuItems(index).indexOf(
    document.activeElement as HTMLElement,
  );
  const targets: Record<string, number | undefined> = {
    ArrowDown: current + 1,
    ArrowUp: current - 1,
    Home: 0,
    End: -1,
  };
  const target = targets[event.key];
  if (target === undefined) return;
  event.preventDefault();
  focusItem(index, target);
}
</script>

<template>
  <div
    :id="baseId"
    ref="barRef"
    role="menubar"
    :aria-label="props.label"
    :class="bar"
  >
    <div
      v-for="(entry, menuIndex) in props.menus"
      :key="menuIndex"
      role="none"
      :class="wrapper"
    >
      <button
        :id="`${baseId}-trigger-${menuIndex}`"
        type="button"
        role="menuitem"
        :tabindex="activeIndex === menuIndex ? 0 : -1"
        :popovertarget="`${baseId}-menu-${menuIndex}`"
        aria-haspopup="menu"
        :aria-expanded="openIndex === menuIndex ? 'true' : 'false'"
        :aria-controls="`${baseId}-menu-${menuIndex}`"
        :data-state="openIndex === menuIndex ? 'open' : 'closed'"
        :class="triggerClass"
        @focus="activeIndex = menuIndex"
        @keydown="onTriggerKeydown(menuIndex, $event)"
      >
        {{ entry.label }}
      </button>
      <div
        :id="`${baseId}-menu-${menuIndex}`"
        popover="auto"
        role="menu"
        :aria-labelledby="`${baseId}-trigger-${menuIndex}`"
        :data-state="openIndex === menuIndex ? 'open' : 'closed'"
        :class="menu"
        @beforetoggle="onBeforeToggle(menuIndex, $event)"
        @toggle="onToggle(menuIndex, $event)"
        @keydown="onMenuKeydown(menuIndex, $event)"
      >
        <template v-for="(option, index) in entry.items" :key="index">
          <div v-if="option.separator" role="separator" :class="separator" />
          <a
            v-else-if="option.href && !option.disabled"
            :href="safeHref(option.href)"
            role="menuitem"
            tabindex="-1"
            :class="[item, tones[option.danger ? 'danger' : 'default']]"
            @click="select(menuIndex, option.value ?? option.label)"
            >{{ option.label }}</a
          >
          <button
            v-else
            type="button"
            role="menuitem"
            tabindex="-1"
            :disabled="option.disabled"
            :class="[item, tones[option.danger ? 'danger' : 'default']]"
            @click="select(menuIndex, option.value ?? option.label)"
          >
            {{ option.label }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
