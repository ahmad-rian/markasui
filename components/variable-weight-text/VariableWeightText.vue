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
    radius?: number;
    min?: number;
    max?: number;
    wave?: boolean;
  }>(),
  { radius: 120, min: 300, max: 800, wave: false },
);

const root = "inline";
const letter =
  "transition-[font-variation-settings,font-weight] duration-200 ease-out motion-reduce:transition-none";

/** Satu napas gelombang (ms) dan selisih fase antarhuruf (radian). */
const WAVE_PERIOD = 2400;
const WAVE_PHASE = 0.45;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Atur berat huruf lewat sumbu wght font variabel, dengan font-weight sebagai cadangan. */
const weight = (value: number) => ({
  fontVariationSettings: `'wght' ${value}`,
  fontWeight: value,
});

const chars = computed(() => Array.from(props.text));
const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
let cleanup = () => {};

function start() {
  cleanup();
  const element = rootEl.value;
  if (!element || reducedMotion()) return;
  const { radius, min, max, wave } = props;
  const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
  const set = (values: number[]) =>
    letters.forEach((el, i) => {
      el.style.fontVariationSettings = `'wght' ${values[i]}`;
      el.style.fontWeight = String(values[i]);
    });
  let pointer: { x: number; y: number } | undefined;
  let visible = false;
  let frame = 0;

  // Huruf terdekat dari kursor paling tebal; di luar radius kembali ke min. Tanpa kursor, wave bernapas.
  const draw = (now: number) => {
    frame = 0;
    const span = max - min;
    const near = pointer
      ? letters.map((el) => {
          const rect = el.getBoundingClientRect();
          const distance = Math.hypot(
            pointer!.x - (rect.left + rect.width / 2),
            pointer!.y - (rect.top + rect.height / 2),
          );
          return Math.min(distance / radius, 1);
        })
      : [];
    if (near.some((t) => t < 1))
      return set(
        near.map((t) =>
          Math.round(min + span * (0.5 + 0.5 * Math.cos(Math.PI * t))),
        ),
      );
    if (!wave) return set(letters.map(() => min));
    set(
      letters.map((_, i) =>
        Math.round(
          min +
            span *
              (0.5 -
                0.5 *
                  Math.cos((now / WAVE_PERIOD) * 2 * Math.PI - i * WAVE_PHASE)),
        ),
      ),
    );
    if (visible) frame = requestAnimationFrame(draw);
  };
  const schedule = () => {
    if (!frame && visible) frame = requestAnimationFrame(draw);
  };
  const move = (event: PointerEvent) => {
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  };
  const out = () => {
    pointer = undefined;
    schedule();
  };

  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          cancelAnimationFrame(frame);
          frame = 0;
          schedule();
        });
  visible = !observer;
  observer?.observe(element);
  schedule();
  addEventListener("pointermove", move);
  document.documentElement.addEventListener("pointerleave", out);
  cleanup = () => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", out);
    set(letters.map(() => min));
  };
}

onMounted(start);
watch(
  () => [props.text, props.radius, props.min, props.max, props.wave],
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
      :style="weight(props.min)"
      >{{ char }}</span
    ></span
  >
</template>
