<script setup lang="ts">
import { computed, ref, useId, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title: string;
    /** Short text, clamped to two lines on the card and shown in full when open. */
    description?: string;
    closeLabel?: string;
    id?: string;
  }>(),
  { description: undefined, closeLabel: "Close", id: undefined },
);

const wrapper = "contents";
const trigger =
  "group relative grid w-full content-start gap-3 rounded-xl border border-line bg-surface p-3 text-left text-ink transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:opacity-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const cardMedia = "block h-28 overflow-hidden rounded-lg bg-subtle";
const cardText = "grid gap-1 px-1 pb-1";
const cardTitle = "text-sm font-medium text-ink";
const cardDescription = "line-clamp-2 text-sm text-muted";
const expandIcon =
  "absolute top-5 right-5 inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-200 ease-out group-hover:rotate-90 motion-reduce:transition-none";
const dialogClass =
  "m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "relative";
const dialogMedia = "h-48 overflow-hidden bg-subtle";
const dialogBody = "grid gap-3 p-5";
const dialogTitle = "pr-10 text-lg font-semibold text-ink";
const dialogDescription = "text-sm text-muted";
const details = "grid gap-3 text-sm text-ink";
const footerClass = "flex flex-wrap justify-end gap-2 pt-2";
const close =
  "absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-4";

const OPEN_MS = 420;
const CLOSE_MS = 320;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const generatedId = useId();
const cardId = computed(() => props.id ?? generatedId);
const triggerEl = useTemplateRef<HTMLButtonElement>("triggerRef");
const dialogEl = useTemplateRef<HTMLDialogElement>("dialogRef");
const panelEl = useTemplateRef<HTMLDivElement>("panelRef");
const open = ref(false);
let closing = false;

const canAnimate = (el: HTMLElement) =>
  typeof el.animate === "function" &&
  !(
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );

type Frames = Parameters<HTMLElement["animate"]>[0];
type AnimateOptions = Exclude<
  Parameters<HTMLElement["animate"]>[1],
  number | undefined
>;

/** Transform that puts the dialog exactly over the card (FLIP "first" frame). */
function overCard(card: DOMRect, dialog: HTMLElement) {
  const box = dialog.getBoundingClientRect();
  return `translate(${card.left - box.left}px, ${card.top - box.top}px) scale(${card.width / box.width}, ${card.height / box.height})`;
}

/** Grow the dialog out of the card, or shrink it back into it. */
function morph(
  dialog: HTMLElement,
  panelNode: HTMLElement,
  card: DOMRect,
  opening: boolean,
) {
  // Stop a running grow or shrink first so the measurement below is not mid-flight.
  dialog
    .getAnimations?.({ subtree: true })
    .forEach((animation) => animation.cancel());
  const frames: Frames = [
    { transform: overCard(card, dialog), transformOrigin: "top left" },
    { transform: "none", transformOrigin: "top left" },
  ];
  const fade: Frames = [
    { opacity: 0 },
    { opacity: 0, offset: 0.35 },
    { opacity: 1 },
  ];
  // Closing holds the last frame until the dialog is closed, so it never flashes back to full size.
  const options: AnimateOptions = {
    duration: opening ? OPEN_MS : CLOSE_MS,
    easing: EASE,
    direction: opening ? "normal" : "reverse",
    fill: opening ? "none" : "forwards",
  };
  panelNode.animate(fade, options);
  dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
    ...options,
    pseudoElement: "::backdrop",
  });
  return dialog.animate(frames, options);
}

function onTrigger(event: MouseEvent) {
  if (!event.defaultPrevented) show();
}

function show() {
  const dialog = dialogEl.value;
  const card = triggerEl.value;
  if (!dialog || !card || dialog.open) return;
  const from = card.getBoundingClientRect();
  dialog.showModal();
  open.value = true;
  if (canAnimate(dialog) && panelEl.value)
    morph(dialog, panelEl.value, from, true);
}

function hide() {
  const dialog = dialogEl.value;
  const card = triggerEl.value;
  if (!dialog?.open || closing) return;
  if (!card || !panelEl.value || !canAnimate(dialog)) {
    dialog.close();
    return;
  }
  closing = true;
  const animation = morph(
    dialog,
    panelEl.value,
    card.getBoundingClientRect(),
    false,
  );
  animation.onfinish = () => dialog.close();
}

function onClosed() {
  dialogEl.value
    ?.getAnimations?.({ subtree: true })
    .forEach((animation) => animation.cancel());
  closing = false;
  open.value = false;
  triggerEl.value?.focus();
}

function onBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) hide();
}
</script>

<template>
  <div :class="wrapper">
    <button
      :id="cardId"
      ref="triggerRef"
      type="button"
      aria-haspopup="dialog"
      :aria-controls="`${cardId}-dialog`"
      :data-state="open ? 'open' : 'closed'"
      :class="trigger"
      v-bind="$attrs"
      @click="onTrigger"
    >
      <span v-if="$slots.media" :class="cardMedia"><slot name="media" /></span>
      <span :class="cardText">
        <span :class="cardTitle">{{ props.title }}</span>
        <span v-if="props.description" :class="cardDescription">{{
          props.description
        }}</span>
      </span>
      <span aria-hidden="true" :class="expandIcon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          :class="icon"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
    </button>
    <dialog
      :id="`${cardId}-dialog`"
      ref="dialogRef"
      :aria-labelledby="`${cardId}-title`"
      :data-state="open ? 'open' : 'closed'"
      :class="dialogClass"
      @close="onClosed"
      @cancel.prevent="hide"
      @keydown.esc.prevent="hide"
      @click="onBackdrop"
    >
      <div ref="panelRef" :class="panel">
        <button
          type="button"
          :aria-label="props.closeLabel"
          :class="close"
          @click="hide"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="icon"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div v-if="$slots.media" :class="dialogMedia">
          <slot name="media" />
        </div>
        <div :class="dialogBody">
          <h2 :id="`${cardId}-title`" :class="dialogTitle">
            {{ props.title }}
          </h2>
          <p v-if="props.description" :class="dialogDescription">
            {{ props.description }}
          </p>
          <div v-if="$slots.default" :class="details"><slot /></div>
          <div v-if="$slots.footer" :class="footerClass">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
