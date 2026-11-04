<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useId,
  useTemplateRef,
} from "vue";

type Side = "top" | "bottom";

const props = withDefaults(
  defineProps<{
    content: string;
    side?: Side;
    id?: string;
  }>(),
  { side: "top", id: undefined },
);

const root = "inline-flex";
const tooltip =
  "inset-auto m-0 max-w-64 rounded-md bg-ink px-2 py-1 text-xs font-medium text-canvas shadow-md";

const GAP = 6;
const SHOW_DELAY = 300;

/** Letakkan tooltip di tengah pemicu pada sisi yang dipilih, pindah sisi kalau tidak muat. */
function placeTooltip(trigger: HTMLElement, tip: HTMLElement, side: Side) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = tip.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const fitsAbove = above >= 0;
  const fitsBelow = below + height <= window.innerHeight;
  const onTop =
    side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
  const left = Math.max(
    GAP,
    Math.min(
      anchor.left + anchor.width / 2 - width / 2,
      window.innerWidth - width - GAP,
    ),
  );
  tip.style.top = `${onTop ? above : below}px`;
  tip.style.left = `${left}px`;
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
const tooltipId = computed(() => props.id ?? generatedId);
const rootEl = useTemplateRef<HTMLSpanElement>("root");
const tipEl = useTemplateRef<HTMLSpanElement>("tip");
const open = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let unfollow: (() => void) | undefined;

function show() {
  clearTimeout(timer);
  tipEl.value?.showPopover();
}

function showLater() {
  clearTimeout(timer);
  timer = setTimeout(show, SHOW_DELAY);
}

function hide() {
  clearTimeout(timer);
  tipEl.value?.hidePopover();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") hide();
}

function stopFollowing() {
  unfollow?.();
  unfollow = undefined;
}

function place() {
  if (rootEl.value && tipEl.value)
    placeTooltip(rootEl.value, tipEl.value, props.side);
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
  if (trigger && !described.split(" ").includes(tooltipId.value))
    trigger.setAttribute(
      "aria-describedby",
      [described, tooltipId.value].filter(Boolean).join(" "),
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
    ref="root"
    :class="root"
    @mouseenter="showLater"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <slot />
    <span
      :id="tooltipId"
      ref="tip"
      popover="manual"
      role="tooltip"
      :data-state="open ? 'open' : 'closed'"
      :class="tooltip"
      @toggle="onToggle"
      >{{ props.content }}</span
    >
  </span>
</template>
