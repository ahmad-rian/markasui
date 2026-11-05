<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue";

const props = withDefaults(
  defineProps<{
    value: number;
    from?: number;
    duration?: number;
    decimals?: number;
    locale?: string;
    prefix?: string;
    suffix?: string;
  }>(),
  {
    from: 0,
    duration: 2000,
    decimals: 0,
    locale: "en-US",
    prefix: "",
    suffix: "",
  },
);

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Ease-out eksponensial: cepat di awal, melambat menjelang angka akhir. */
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/** Panggil `callback` sekali saat elemen pertama kali terlihat. Mengembalikan fungsi pelepas. */
function whenVisible(element: Element, callback: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    callback();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
const display = ref(props.value);
let current = props.from;
let frame = 0;
let stop = () => {};

function cancel() {
  stop();
  cancelAnimationFrame(frame);
}

function run() {
  cancel();
  const element = rootEl.value;
  if (!element || reducedMotion()) {
    current = props.value;
    display.value = props.value;
    return;
  }
  const start = current;
  const target = props.value;
  display.value = start;
  stop = whenVisible(element, () => {
    let began: number | undefined;
    const tick = (now: number) => {
      began ??= now;
      const progress = Math.min((now - began) / props.duration, 1);
      current = start + (target - start) * easeOut(progress);
      display.value = current;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  });
}

onMounted(run);
watch(() => [props.value, props.duration], run);
onBeforeUnmount(cancel);

const formatter = computed(
  () =>
    new Intl.NumberFormat(props.locale, {
      minimumFractionDigits: props.decimals,
      maximumFractionDigits: props.decimals,
    }),
);
const text = (n: number) =>
  `${props.prefix}${formatter.value.format(n)}${props.suffix}`;
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ text(props.value) }}</span
    ><span aria-hidden="true" :class="holder">{{ text(props.value) }}</span
    ><span aria-hidden="true" :class="layer">{{ text(display) }}</span></span
  >
</template>
