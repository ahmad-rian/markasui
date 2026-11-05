<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useTemplateRef,
} from "vue";

const props = withDefaults(defineProps<{ id?: string }>(), { id: undefined });

const root = "inline-block";
const card =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

const GAP = 8;
const SHOW_DELAY = 400;
/** Jeda singkat supaya pointer sempat pindah dari pemicu ke kartu. */
const HIDE_DELAY = 100;

/** Letakkan kartu di bawah tengah pemicu, pindah ke atas kalau tidak muat. */
function placeCard(trigger: HTMLElement, target: HTMLElement) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = target.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const onTop = below + height > window.innerHeight && above >= 0;
  const left = Math.max(
    GAP,
    Math.min(
      anchor.left + anchor.width / 2 - width / 2,
      window.innerWidth - width - GAP,
    ),
  );
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
const cardId = computed(() => props.id ?? generatedId);
const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
const cardEl = useTemplateRef<HTMLSpanElement>("cardRef");
const open = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let unfollow: (() => void) | undefined;

function show() {
  clearTimeout(timer);
  cardEl.value?.showPopover();
}

function showLater() {
  clearTimeout(timer);
  if (open.value) return;
  timer = setTimeout(show, SHOW_DELAY);
}

function hide() {
  clearTimeout(timer);
  cardEl.value?.hidePopover();
}

function hideLater() {
  clearTimeout(timer);
  timer = setTimeout(hide, HIDE_DELAY);
}

// Fokus yang pindah ke dalam kartu (misalnya link di kartu) tidak menutup kartu.
function onFocusOut(event: FocusEvent) {
  if (!rootEl.value?.contains(event.relatedTarget as Node | null)) hide();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") hide();
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function place() {
  if (rootEl.value && cardEl.value) placeCard(rootEl.value, cardEl.value);
}

function onToggle(event: Event) {
  stopFollowing();
  open.value = (event as ToggleEvent).newState === "open";
  if (!open.value) return;
  place();
  unfollow = followViewport(place);
}

onMounted(() => {
  const trigger = rootEl.value?.firstElementChild;
  const described = trigger?.getAttribute("aria-describedby") ?? "";
  if (
    trigger &&
    trigger !== cardEl.value &&
    !described.split(" ").includes(cardId.value)
  )
    trigger.setAttribute(
      "aria-describedby",
      [described, cardId.value].filter(Boolean).join(" "),
    );
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  clearTimeout(timer);
  stopFollowing();
});
</script>

<template>
  <span
    ref="rootRef"
    :class="root"
    @mouseenter="showLater"
    @mouseleave="hideLater"
    @focusin="show"
    @focusout="onFocusOut"
  >
    <slot />
    <span
      :id="cardId"
      ref="cardRef"
      popover="manual"
      :data-state="open ? 'open' : 'closed'"
      :class="card"
      @toggle="onToggle"
      ><slot name="content"
    /></span>
  </span>
</template>
