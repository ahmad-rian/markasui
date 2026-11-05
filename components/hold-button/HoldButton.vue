<script setup lang="ts">
import { onBeforeUnmount, ref, useId } from "vue";

defineOptions({ inheritAttrs: false });

const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};
const fillVariants = {
  primary: "bg-on-primary/25",
  secondary: "bg-primary/10",
  ghost: "bg-primary/10",
  danger: "bg-on-primary/25",
};

const props = withDefaults(
  defineProps<{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    /** How long the button must be held, in milliseconds. */
    duration?: number;
    /** Hidden hint read by screen readers. */
    holdLabel?: string;
  }>(),
  {
    variant: "primary",
    size: "md",
    duration: 1500,
    holdLabel: "Press and hold to confirm",
  },
);
const emit = defineEmits<{ complete: [] }>();

const wrapper = "contents";
const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const fill =
  "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-data-[state=complete]:scale-x-100 group-data-[state=holding]:scale-x-100 group-data-[state=holding]:duration-(--hold-duration) group-data-[state=holding]:ease-linear";
const srOnly = "sr-only";

const HOLD_KEYS = new Set([" ", "Enter"]);

const hintId = useId();
const state = ref<"idle" | "holding" | "complete">("idle");
let timer: ReturnType<typeof setTimeout> | undefined;
onBeforeUnmount(() => clearTimeout(timer));

function start() {
  if (state.value !== "idle") return;
  state.value = "holding";
  timer = setTimeout(() => {
    state.value = "complete";
    emit("complete");
  }, props.duration);
}
function cancel() {
  clearTimeout(timer);
  state.value = "idle";
}
function onKeydown(event: KeyboardEvent) {
  if (!HOLD_KEYS.has(event.key)) return;
  event.preventDefault();
  if (!event.repeat) start();
}
function onKeyup(event: KeyboardEvent) {
  if (HOLD_KEYS.has(event.key)) cancel();
}
</script>

<template>
  <span :class="wrapper">
    <button
      type="button"
      :data-state="state"
      :aria-describedby="hintId"
      :style="{ '--hold-duration': `${props.duration}ms` }"
      :class="[base, variants[props.variant], sizes[props.size]]"
      v-bind="$attrs"
      @pointerdown="$event.button === 0 && start()"
      @pointerup="cancel"
      @pointerleave="cancel"
      @pointercancel="cancel"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @blur="cancel"
      @contextmenu.prevent
    >
      <span :class="[fill, fillVariants[props.variant]]" aria-hidden="true" />
      <slot />
    </button>
    <span :id="hintId" :class="srOnly">{{ props.holdLabel }}</span>
  </span>
</template>
