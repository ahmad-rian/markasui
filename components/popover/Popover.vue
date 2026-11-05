<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, useTemplateRef } from "vue";

type Side = "top" | "bottom";
type Align = "start" | "center" | "end";

const props = withDefaults(
  defineProps<{
    label?: string;
    side?: Side;
    align?: Align;
    id?: string;
  }>(),
  { label: "Open", side: "bottom", align: "start", id: undefined },
);

const root = "inline-block";
const triggerClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
const panel =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

const GAP = 4;
const FOCUSABLE =
  "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

/** Letakkan panel di sisi pilihan dengan perataan pilihan, pindah sisi kalau tidak muat. */
function placePanel(
  trigger: HTMLElement,
  target: HTMLElement,
  side: Side,
  align: Align,
) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = target.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const fitsAbove = above >= 0;
  const fitsBelow = below + height <= window.innerHeight;
  const onTop =
    side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
  const starts: Record<Align, number> = {
    start: anchor.left,
    center: anchor.left + anchor.width / 2 - width / 2,
    end: anchor.right - width,
  };
  const start = starts[align] ?? starts.start;
  const left = Math.max(GAP, Math.min(start, window.innerWidth - width - GAP));
  target.style.top = `${onTop ? above : below}px`;
  target.style.left = `${left}px`;
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
const panelId = computed(() => props.id ?? generatedId);
const triggerEl = useTemplateRef<HTMLButtonElement>("trigger");
const panelEl = useTemplateRef<HTMLDivElement>("panelRef");
const open = ref(false);
const state = computed(() => (open.value ? "open" : "closed"));
let unfollow: (() => void) | undefined;

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function place() {
  if (triggerEl.value && panelEl.value)
    placePanel(triggerEl.value, panelEl.value, props.side, props.align);
}

// beforetoggle berjalan sinkron, jadi status selalu terbaru untuk klik berikutnya.
function onBeforeToggle(event: Event) {
  open.value = (event as ToggleEvent).newState === "open";
}

function onToggle(event: Event) {
  stopFollowing();
  const target = panelEl.value;
  if (!target) return;
  if ((event as ToggleEvent).newState === "open") {
    place();
    unfollow = followViewport(place);
    target.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return;
  }
  // Fokus kembali ke pemicu, kecuali user sudah memindahkannya ke elemen lain di luar panel.
  const active = document.activeElement;
  if (active === document.body || target.contains(active))
    triggerEl.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  event.preventDefault();
  panelEl.value?.hidePopover();
  triggerEl.value?.focus();
}

onBeforeUnmount(stopFollowing);
</script>

<template>
  <div :class="root">
    <button
      :id="`${panelId}-trigger`"
      ref="trigger"
      type="button"
      :popovertarget="panelId"
      aria-haspopup="dialog"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="panelId"
      :data-state="state"
      :class="triggerClass"
    >
      <slot name="trigger">{{ props.label }}</slot>
    </button>
    <div
      :id="panelId"
      ref="panelRef"
      popover="auto"
      role="dialog"
      :aria-labelledby="`${panelId}-trigger`"
      :data-state="state"
      :class="panel"
      @beforetoggle="onBeforeToggle"
      @toggle="onToggle"
      @keydown="onKeydown"
    >
      <slot />
    </div>
  </div>
</template>
