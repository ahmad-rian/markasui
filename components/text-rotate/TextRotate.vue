<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue";

type From = "first" | "last" | "center" | "random";

const props = withDefaults(
  defineProps<{
    words: string[];
    split?: "chars" | "words";
    from?: From;
    interval?: number;
    stagger?: number;
    duration?: number;
    pauseOnHover?: boolean;
  }>(),
  {
    split: "chars",
    from: "first",
    interval: 2500,
    stagger: 25,
    duration: 400,
    pauseOnHover: true,
  },
);

const root = "relative inline-flex overflow-hidden align-bottom";
const unit = "inline-block whitespace-pre";

const EASE_IN = "cubic-bezier(0.55, 0, 1, 0.45)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Potong frasa menjadi huruf, atau kata beserta spasi sesudahnya. */
const splitText = (text: string, split: "chars" | "words") =>
  split === "chars" ? Array.from(text) : text.split(/(?<= )/);

/** Jeda stagger tiap bagian sesuai titik awal. Random memakai urutan acak tetap (hash). */
function ranks(count: number, from: From) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (from === "random") order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => {
    const middle = Math.abs(index - (count - 1) / 2);
    rank[index] =
      from === "last"
        ? count - 1 - index
        : from === "center"
          ? middle
          : position;
  });
  return rank;
}

const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
const index = ref(0);
const parts = computed(() =>
  splitText(props.words[index.value] ?? props.words[0] ?? "", props.split),
);
const units = () => [
  ...(rootEl.value?.querySelectorAll<HTMLElement>("[data-unit]") ?? []),
];
let cleanup = () => {};

// Kata baru masuk dari bawah per bagian, dan lebar pembungkus ikut melebar atau menyempit halus.
function enter(element: HTMLElement, width: number) {
  const { duration, stagger } = props;
  const list = units();
  const rank = ranks(list.length, props.from);
  list.forEach((el, i) =>
    el.animate?.(
      [
        { transform: "translateY(100%)", opacity: 0 },
        { transform: "none", opacity: 1 },
      ],
      {
        duration,
        delay: rank[i]! * stagger,
        easing: EASE_OUT,
        fill: "backwards",
      },
    ),
  );
  element.animate?.(
    [{ width: `${width}px` }, { width: `${element.offsetWidth}px` }],
    { duration, easing: EASE_OUT },
  );
}

// Kata lama keluar ke atas, lalu kata berikutnya dipasang. Berhenti saat di-hover, di luar layar, atau tab tersembunyi.
function start() {
  cleanup();
  index.value = 0;
  const element = rootEl.value;
  const count = props.words.length;
  if (!element || count < 2 || reducedMotion()) return;
  const { duration, stagger, interval, pauseOnHover } = props;
  let hovered = false;
  let busy = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const tick = () => {
    if (busy || (hovered && pauseOnHover) || document.hidden) return;
    busy = true;
    const list = units();
    const rank = ranks(list.length, props.from);
    const exits = list.map((el, i) =>
      el.animate?.(
        [
          { transform: "none", opacity: 1 },
          { transform: "translateY(-100%)", opacity: 0 },
        ],
        {
          duration,
          delay: rank[i]! * stagger,
          easing: EASE_IN,
          fill: "forwards",
        },
      ),
    );
    Promise.all(exits.map((animation) => animation?.finished))
      .then(async () => {
        const width = element.offsetWidth;
        index.value = (index.value + 1) % count;
        await nextTick();
        enter(element, width);
      })
      .catch(() => {})
      .finally(() => (busy = false));
  };
  const onEnter = () => (hovered = true);
  const onLeave = () => (hovered = false);
  element.addEventListener("pointerenter", onEnter);
  element.addEventListener("pointerleave", onLeave);
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          clearInterval(timer);
          if (entries.some((entry) => entry.isIntersecting))
            timer = setInterval(tick, interval);
        });
  if (observer) observer.observe(element);
  else timer = setInterval(tick, interval);
  cleanup = () => {
    observer?.disconnect();
    clearInterval(timer);
    element.removeEventListener("pointerenter", onEnter);
    element.removeEventListener("pointerleave", onLeave);
  };
}

onMounted(start);
watch(
  () => [
    props.words.join("\n"),
    props.split,
    props.from,
    props.interval,
    props.stagger,
    props.duration,
    props.pauseOnHover,
  ],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => cleanup());
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ props.words.join(", ") }}</span
    ><span
      v-for="(part, i) in parts"
      :key="`${index}-${i}`"
      aria-hidden="true"
      data-unit
      :class="unit"
      >{{ part }}</span
    ></span
  >
</template>
