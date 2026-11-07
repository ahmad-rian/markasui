<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  useTemplateRef,
  watch,
} from "vue";

type From = "first" | "last" | "center" | "random";

const props = withDefaults(
  defineProps<{
    /** Baris baru (\n) memecah teks menjadi beberapa baris. */
    text: string;
    split?: "chars" | "words" | "lines";
    direction?: "up" | "down";
    from?: From;
    stagger?: number;
    duration?: number;
    delay?: number;
  }>(),
  {
    split: "words",
    direction: "up",
    from: "first",
    stagger: 60,
    duration: 700,
    delay: 0,
  },
);

const root = "block";
const line = "block";
const lineCut = "block overflow-hidden pb-[0.12em] -mb-[0.12em]";
const cut = "inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]";
const unit = "inline-block whitespace-pre";
const lineUnit = "block";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const offsets = { up: "translateY(120%)", down: "translateY(-120%)" };

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

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

const lines = computed(() => props.text.split("\n"));
const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
let cleanup = () => {};

// Sembunyikan setiap bagian di balik garis potong, lalu munculkan bergiliran saat teks masuk layar.
function start() {
  cleanup();
  const element = rootEl.value;
  if (!element || reducedMotion()) return;
  const { duration, delay, stagger } = props;
  const units = [...element.querySelectorAll<HTMLElement>("[data-unit]")];
  const rank = ranks(units.length, props.from);
  const offset = offsets[props.direction];
  units.forEach((el) => (el.style.transform = offset));
  const reveal = () =>
    units.forEach((el, i) => {
      el.animate?.([{ transform: offset }, { transform: "none" }], {
        duration,
        delay: delay + rank[i]! * stagger,
        easing: EASING,
        fill: "backwards",
      });
      el.style.transform = "";
    });
  if (typeof IntersectionObserver === "undefined") return reveal();
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    reveal();
  });
  observer.observe(element);
  cleanup = () => {
    observer.disconnect();
    units.forEach((el) => (el.style.transform = ""));
  };
}

onMounted(start);
watch(
  () => [
    props.text,
    props.split,
    props.direction,
    props.from,
    props.stagger,
    props.duration,
    props.delay,
  ],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => cleanup());
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ lines.join(" ") }}</span
    ><span aria-hidden="true"
      ><template v-for="(lineText, l) in lines" :key="l"
        ><span v-if="props.split === 'lines'" :class="lineCut"
          ><span data-unit :class="lineUnit">{{ lineText }}</span></span
        ><span v-else :class="line"
          ><template v-for="(word, w) in lineText.split(' ')" :key="w"
            >{{ w > 0 ? " " : ""
            }}<span :class="cut"
              ><span v-if="props.split === 'words'" data-unit :class="unit">{{
                word
              }}</span
              ><template v-else
                ><span
                  v-for="(char, c) in Array.from(word)"
                  :key="c"
                  data-unit
                  :class="unit"
                  >{{ char }}</span
                ></template
              ></span
            ></template
          ></span
        ></template
      ></span
    ></span
  >
</template>
