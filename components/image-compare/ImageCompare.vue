<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    /** Percent moved per arrow key press. */
    step?: number;
    beforeLabel?: string;
    afterLabel?: string;
    sliderLabel?: string;
  }>(),
  {
    orientation: "horizontal",
    step: 5,
    beforeLabel: "Before",
    afterLabel: "After",
    sliderLabel: "Comparison position",
  },
);
/** Divider position in percent, measured from the start (left or top). */
const position = defineModel<number>("position", { default: 50 });
defineSlots<{ before?: () => unknown; after?: () => unknown }>();

const root =
  "group/compare relative isolate grid overflow-hidden rounded-xl select-none [&_img]:pointer-events-none";
const layer = "relative col-start-1 row-start-1 min-w-0 bg-surface";
const motion =
  "duration-200 ease-out group-data-dragging/compare:transition-none motion-reduce:transition-none";
const label =
  "pointer-events-none absolute rounded-full border border-line bg-surface/85 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-sm";
const divider = "pointer-events-none absolute z-10 bg-surface";
const handle =
  "pointer-events-auto absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full border border-line bg-surface text-ink shadow-overlay transition-[scale] duration-150 ease-out group-data-dragging/compare:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const iconClass = "size-5";
const orientations = {
  horizontal: {
    root: "cursor-ew-resize touch-pan-y",
    clip: "[clip-path:inset(0_calc(100%_-_var(--position))_0_0)] transition-[clip-path]",
    divider:
      "inset-y-0 left-(--position) w-0.5 -translate-x-1/2 transition-[left]",
    before: "top-3 left-3",
    after: "top-3 right-3",
    icon: "",
  },
  vertical: {
    root: "cursor-ns-resize touch-pan-x",
    clip: "[clip-path:inset(0_0_calc(100%_-_var(--position))_0)] transition-[clip-path]",
    divider:
      "inset-x-0 top-(--position) h-0.5 -translate-y-1/2 transition-[top]",
    before: "top-3 left-3",
    after: "bottom-3 left-3",
    icon: "rotate-90",
  },
};

const PAGE_STEP = 10;

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const clamp = (value: number) => Math.min(100, Math.max(0, value));

const o = computed(() => orientations[props.orientation]);
const vertical = computed(() => props.orientation === "vertical");
const current = computed(() => clamp(position.value));
const dragging = ref(false);
const handleEl = ref<HTMLElement>();
let pressed = false;

const move = (next: number) => {
  position.value = clamp(next);
};
function fromPointer(event: PointerEvent) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  move(
    vertical.value
      ? ((event.clientY - rect.top) / rect.height) * 100
      : ((event.clientX - rect.left) / rect.width) * 100,
  );
}

function onPointerdown(event: PointerEvent) {
  if (event.button !== 0) return;
  event.preventDefault();
  pressed = true;
  handleEl.value?.focus({ preventScroll: true });
  (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  fromPointer(event);
}
function onPointermove(event: PointerEvent) {
  if (!pressed) return;
  dragging.value = true;
  fromPointer(event);
}
function release() {
  pressed = false;
  dragging.value = false;
}

function onKeydown(event: KeyboardEvent) {
  const flip = vertical.value ? -1 : 1;
  const at = current.value;
  const moves: Record<string, number> = {
    ArrowRight: at + props.step,
    ArrowLeft: at - props.step,
    ArrowUp: at + props.step * flip,
    ArrowDown: at - props.step * flip,
    PageUp: at + PAGE_STEP,
    PageDown: at - PAGE_STEP,
    Home: 0,
    End: 100,
  };
  const next = moves[event.key];
  if (next === undefined) return;
  event.preventDefault();
  move(next);
}
</script>

<template>
  <div
    role="group"
    :data-orientation="props.orientation"
    :data-dragging="dragging ? '' : undefined"
    :class="cx(root, o.root)"
    :style="{ '--position': `${current}%` }"
    @pointerdown="onPointerdown"
    @pointermove="onPointermove"
    @pointerup="release"
    @pointercancel="release"
  >
    <div :class="layer">
      <slot name="after" />
      <span :class="cx(label, o.after)">{{ props.afterLabel }}</span>
    </div>
    <div :class="cx(layer, o.clip, motion)">
      <slot name="before" />
      <span :class="cx(label, o.before)">{{ props.beforeLabel }}</span>
    </div>
    <div :class="cx(divider, o.divider, motion)">
      <div
        ref="handleEl"
        role="slider"
        tabindex="0"
        :aria-label="props.sliderLabel"
        :aria-orientation="props.orientation"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="Math.round(current)"
        :aria-valuetext="`${Math.round(current)}%`"
        :class="handle"
        @keydown="onKeydown"
      >
        <svg
          :class="cx(iconClass, o.icon)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </div>
    </div>
  </div>
</template>
