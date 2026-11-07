<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  useTemplateRef,
  watch,
} from "vue";

const props = withDefaults(
  defineProps<{
    text: string;
    mode?: "forward" | "pingpong" | "random";
    direction?: "up" | "down";
    stagger?: number;
    duration?: number;
  }>(),
  { mode: "forward", direction: "up", stagger: 30, duration: 400 },
);

const root = "relative inline-flex overflow-hidden";
const letter = "relative inline-block whitespace-pre";
const copies = {
  up: "absolute inset-x-0 top-full",
  down: "absolute inset-x-0 bottom-full",
};

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Peringkat stagger tiap huruf. Mode random memakai urutan acak tetap (hash), sama di setiap render. */
function ranks(count: number, random: boolean) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (random) order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => (rank[index] = position));
  return rank;
}

const chars = computed(() => Array.from(props.text));
const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
let cleanup = () => {};

function start() {
  cleanup();
  const element = rootEl.value;
  if (!element || reducedMotion()) return;
  const { mode, direction, stagger, duration } = props;
  const target = element.closest<HTMLElement>(TRIGGER) ?? element;
  const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
  const rank = ranks(letters.length, mode === "random");
  const shift = `translateY(${direction === "up" ? "-100%" : "100%"})`;
  let busyUntil = 0;

  // Pingpong: transisi CSS bolak-balik. Forward/random: sekali jalan lalu kembali tanpa terlihat.
  const move = (enter: boolean) => {
    const now = performance.now();
    if (mode !== "pingpong") {
      if (!enter || now < busyUntil) return;
      busyUntil = now + duration + stagger * letters.length;
    }
    letters.forEach((el, i) => {
      const delay = rank[i]! * stagger;
      if (mode !== "pingpong") {
        el.animate?.([{ transform: "none" }, { transform: shift }], {
          duration,
          delay,
          easing: EASING,
        });
        return;
      }
      el.style.transition = `transform ${duration}ms ${EASING} ${delay}ms`;
      el.style.transform = enter ? shift : "";
    });
  };
  const enter = () => move(true);
  const leave = () => move(false);
  target.addEventListener("pointerenter", enter);
  target.addEventListener("focusin", enter);
  target.addEventListener("pointerleave", leave);
  target.addEventListener("focusout", leave);
  cleanup = () => {
    target.removeEventListener("pointerenter", enter);
    target.removeEventListener("focusin", enter);
    target.removeEventListener("pointerleave", leave);
    target.removeEventListener("focusout", leave);
    letters.forEach((el) => {
      el.style.transition = "";
      el.style.transform = "";
    });
  };
}

onMounted(start);
watch(
  () => [
    props.text,
    props.mode,
    props.direction,
    props.stagger,
    props.duration,
  ],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => cleanup());
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ props.text }}</span
    ><span
      v-for="(char, index) in chars"
      :key="index"
      aria-hidden="true"
      data-letter
      :class="letter"
      >{{ char }}<span :class="copies[props.direction]">{{ char }}</span></span
    ></span
  >
</template>
