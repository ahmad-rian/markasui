<script setup lang="ts">
import {
  Comment,
  Fragment,
  Text,
  computed,
  ref,
  useId,
  useSlots,
  useTemplateRef,
  type VNode,
} from "vue";

const props = withDefaults(
  defineProps<{
    /** Accessible name of the stack region. */
    label?: string;
    prevLabel?: string;
    nextLabel?: string;
    /** Name of each card and the live position text. Accepts {index} and {total}. */
    cardLabel?: string;
    id?: string;
  }>(),
  {
    label: "Card stack",
    prevLabel: "Previous card",
    nextLabel: "Next card",
    cardLabel: "{index} of {total}",
    id: undefined,
  },
);

const root = "w-full";
const stack =
  "relative grid touch-pan-y rounded-xl pb-4 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const card =
  "group col-start-1 row-start-1 origin-bottom overflow-hidden rounded-xl border border-line bg-surface transition-[translate,scale,opacity,background-color] duration-300 ease-out data-[depth=0]:z-30 data-[depth=0]:cursor-grab data-[depth=1]:z-20 data-[depth=1]:translate-y-2 data-[depth=1]:scale-[0.95] data-[depth=1]:bg-subtle data-[depth=2]:z-10 data-[depth=2]:translate-y-4 data-[depth=2]:scale-[0.9] data-[depth=2]:bg-subtle data-[depth=3]:translate-y-4 data-[depth=3]:scale-[0.9] data-[depth=3]:opacity-0 data-dragging:cursor-grabbing data-dragging:transition-none data-leaving:z-40 motion-reduce:transition-none";
const content =
  "h-full opacity-0 transition-opacity duration-300 ease-out group-data-leaving:opacity-100 group-data-[depth=0]:opacity-100 motion-reduce:transition-none";
const controls = "mt-3 flex items-center justify-between gap-3";
const navButton =
  "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[background-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const dots = "flex items-center gap-1.5";
const dot =
  "h-1.5 w-1.5 rounded-full bg-primary-line transition-all duration-300 ease-out data-[state=active]:w-5 data-[state=active]:bg-primary motion-reduce:transition-none";
const icon = "size-4";
const srOnly = "sr-only";

const FLING_MS = 450;
const SETTLE_MS = 250;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
/** Share of the stack width a drag must pass to throw the card. */
const SWIPE_RATIO = 0.25;
/** Pixels of movement before a press becomes a drag, so clicks inside cards still work. */
const DRAG_START = 4;
const MAX_DEPTH = 3;

const slots = useSlots();
const generatedId = useId();
const stackId = computed(() => `${props.id ?? generatedId}-cards`);
const stackEl = useTemplateRef<HTMLDivElement>("stackRef");
const index = ref(0);
let drag: { x: number; moved: boolean } | null = null;

/** Flatten fragments (v-for) and drop comments or blank text so each element is one card. */
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment) return flatten(node.children as VNode[]);
    if (node.type === Comment) return [];
    if (node.type === Text && String(node.children).trim() === "") return [];
    return [node];
  });
}
const cards = (): VNode[] => flatten(slots.default?.() ?? []);
const total = () => cards().length;

const formatLabel = (template: string, i: number, count: number) =>
  template
    .replaceAll("{index}", String(i))
    .replaceAll("{total}", String(count));
const depthOf = (i: number) =>
  Math.min((i - index.value + total()) % total(), MAX_DEPTH);

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;
const away = (direction: number) =>
  `translateX(${direction * 120}%) rotate(${direction * 14}deg)`;

type Frames = Parameters<HTMLElement["animate"]>[0];

function play(el: HTMLElement, keyframes: Frames, duration: number) {
  if (reducedMotion() || typeof el.animate !== "function") return undefined;
  el.getAnimations().forEach((animation) => animation.finish());
  return el.animate(keyframes, { duration, easing: EASE });
}

/** Throw the card off to one side; it then fades in at the back of the stack. */
function fling(el: HTMLElement, direction: number) {
  const from = el.style.transform || "none";
  el.style.transform = "";
  delete el.dataset.dragging;
  el.dataset.leaving = "";
  const animation = play(
    el,
    [
      { transform: from, opacity: 1 },
      { opacity: 1, offset: 0.5 },
      { transform: away(direction), opacity: 0 },
    ],
    FLING_MS,
  );
  if (!animation) {
    delete el.dataset.leaving;
    return;
  }
  animation.onfinish = () => {
    delete el.dataset.leaving;
    play(el, [{ opacity: 0, offset: 0 }], SETTLE_MS);
  };
}

/** Slide a card back in from one side. */
const arrive = (el: HTMLElement, direction: number) =>
  play(
    el,
    [
      { transform: away(direction), opacity: 0 },
      { transform: "none", opacity: 1 },
    ],
    FLING_MS,
  );

/** Spring a dragged card back to the middle. */
function settle(el: HTMLElement) {
  const from = el.style.transform;
  el.style.transform = "";
  delete el.dataset.dragging;
  if (from) play(el, [{ transform: from }, { transform: "none" }], SETTLE_MS);
}

const cardAt = (i: number) =>
  stackEl.value?.children[i] as HTMLElement | undefined;

/** Step forward (throw the top card) or back (bring the last card in). */
function go(step: 1 | -1, direction = -1) {
  const count = total();
  if (count < 2) return;
  const target = (index.value + step + count) % count;
  const top = cardAt(index.value);
  const incoming = cardAt(target);
  if (step === 1 && top) fling(top, direction);
  if (step === -1 && incoming) arrive(incoming, direction);
  index.value = target;
}

function onKeydown(event: KeyboardEvent) {
  const steps: Record<string, 1 | -1 | undefined> = {
    ArrowRight: 1,
    ArrowLeft: -1,
  };
  const step = steps[event.key];
  if (step === undefined || event.defaultPrevented) return;
  event.preventDefault();
  go(step);
}

function onPointerdown(event: PointerEvent) {
  if (event.button !== 0 || total() < 2) return;
  drag = { x: event.clientX, moved: false };
}
function onPointermove(event: PointerEvent) {
  const top = cardAt(index.value);
  if (!drag || !top) return;
  const dx = event.clientX - drag.x;
  if (!drag.moved) {
    if (Math.abs(dx) < DRAG_START) return;
    drag.moved = true;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    top.dataset.dragging = "";
  }
  top.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`;
}
function onPointerup(event: PointerEvent) {
  const state = drag;
  drag = null;
  const top = cardAt(index.value);
  if (!state?.moved || !top) return;
  const dx = event.clientX - state.x;
  const width = (event.currentTarget as HTMLElement).offsetWidth;
  if (Math.abs(dx) > width * SWIPE_RATIO) go(1, Math.sign(dx));
  else settle(top);
}
function onPointercancel() {
  const top = cardAt(index.value);
  if (drag?.moved && top) settle(top);
  drag = null;
}
</script>

<template>
  <div
    :id="props.id"
    role="region"
    aria-roledescription="carousel"
    :aria-label="props.label"
    :class="root"
    @keydown="onKeydown"
  >
    <div
      :id="stackId"
      ref="stackRef"
      tabindex="0"
      :class="stack"
      @pointerdown="onPointerdown"
      @pointermove="onPointermove"
      @pointerup="onPointerup"
      @pointercancel="onPointercancel"
    >
      <div
        v-for="(child, i) in cards()"
        :key="i"
        role="group"
        aria-roledescription="slide"
        :aria-label="formatLabel(props.cardLabel, i + 1, total())"
        :data-depth="depthOf(i)"
        :inert="depthOf(i) !== 0 || undefined"
        :class="card"
      >
        <div :class="content"><component :is="child" /></div>
      </div>
    </div>
    <div :class="controls">
      <button
        type="button"
        :aria-label="props.prevLabel"
        :aria-controls="stackId"
        :disabled="total() < 2"
        :class="navButton"
        @click="go(-1)"
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
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div aria-hidden="true" :class="dots">
        <span
          v-for="(_, i) in cards()"
          :key="i"
          :data-state="i === index ? 'active' : 'inactive'"
          :class="dot"
        />
      </div>
      <button
        type="button"
        :aria-label="props.nextLabel"
        :aria-controls="stackId"
        :disabled="total() < 2"
        :class="navButton"
        @click="go(1)"
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
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
    <p aria-live="polite" :class="srOnly">
      {{ formatLabel(props.cardLabel, index + 1, total()) }}
    </p>
  </div>
</template>
