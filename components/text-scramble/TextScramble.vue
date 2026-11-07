<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    text: string;
    trigger?: "hover" | "view" | "mount";
    charset?: "letters" | "digits" | "symbols" | "binary";
    duration?: number;
    delay?: number;
  }>(),
  { trigger: "hover", charset: "letters", duration: 800, delay: 0 },
);

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const charsets = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@$%&*+=<>/?{}[]",
  binary: "01",
};

/** Huruf acak diganti paling cepat setiap 50 ms supaya tetap terbaca sebagai efek, bukan kedipan. */
const FRAME = 50;
/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Acak deterministik (Park-Miller): urutan huruf acak sama di setiap putaran dan framework. */
function scrambler(text: string, charset: string) {
  const chars = Array.from(text);
  let seed = 1;
  const pick = () => {
    seed = (seed * 48271) % 2147483647;
    return charset[seed % charset.length];
  };
  return (revealed: number) =>
    chars
      .map((char, i) => (i < revealed || char.trim() === "" ? char : pick()))
      .join("");
}

const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
const display = ref(props.text);
let cleanup = () => {};

function start() {
  cleanup();
  const { text, trigger, duration, delay } = props;
  const element = rootEl.value;
  display.value = text;
  if (!element || reducedMotion()) return;
  const set = charsets[props.charset];
  const total = Array.from(text).length;
  let frame = 0;
  let observer: IntersectionObserver | undefined;

  // Acak semua huruf, lalu buka dari kiri ke kanan sampai teks asli kembali utuh.
  const run = (wait: number) => {
    if (frame) return;
    const scramble = scrambler(text, set);
    let began: number | undefined;
    let last = -FRAME;
    const tick = (now: number) => {
      began ??= now;
      const progress = Math.min((now - began - wait) / duration, 1);
      if (now - last >= FRAME || progress >= 1) {
        last = now;
        display.value = scramble(Math.max(Math.floor(progress * total), 0));
      }
      frame = progress < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
  };

  const target = element.closest<HTMLElement>(TRIGGER) ?? element;
  const hover = () => run(0);
  if (trigger === "hover") {
    target.addEventListener("pointerenter", hover);
    target.addEventListener("focusin", hover);
  } else {
    display.value = scrambler(text, set)(0);
    if (trigger === "mount" || typeof IntersectionObserver === "undefined")
      run(delay);
    else {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        run(delay);
      });
      observer.observe(element);
    }
  }
  cleanup = () => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    target.removeEventListener("pointerenter", hover);
    target.removeEventListener("focusin", hover);
  };
}

onMounted(start);
watch(
  () => [props.text, props.trigger, props.charset, props.duration, props.delay],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => cleanup());
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ props.text }}</span
    ><span aria-hidden="true" :class="holder">{{ props.text }}</span
    ><span aria-hidden="true" :class="layer">{{ display }}</span></span
  >
</template>
