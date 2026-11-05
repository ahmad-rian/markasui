<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";

const props = withDefaults(
  defineProps<{
    words: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    pause?: number;
    loop?: boolean;
    cursor?: boolean;
  }>(),
  { typeSpeed: 70, deleteSpeed: 40, pause: 1800, loop: true, cursor: true },
);

const root = "inline";
const caret = "ml-0.5 inline-block h-[1.1em] w-0.5 bg-current align-[-0.2em]";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Panggil `callback(true/false)` setiap kali elemen masuk atau keluar layar. Mengembalikan fungsi pelepas. */
function onVisibility(element: Element, callback: (visible: boolean) => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback(true);
    return () => {};
  }
  const observer = new IntersectionObserver((entries) =>
    callback(entries.some((entry) => entry.isIntersecting)),
  );
  observer.observe(element);
  return () => observer.disconnect();
}

/** Kursor berkedip setiap 500 ms memakai Web Animations API. */
function blink(element: HTMLElement | null) {
  return element?.animate?.([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    iterations: Infinity,
    easing: "steps(2, jump-none)",
  });
}

const rootEl = useTemplateRef<HTMLSpanElement>("rootRef");
const caretEl = useTemplateRef<HTMLSpanElement>("caretRef");
const text = ref(props.words[0] ?? "");
let cleanup = () => {};

function start() {
  cleanup();
  const list = props.words.map((word) => Array.from(word));
  text.value = list[0]?.join("") ?? "";
  const element = rootEl.value;
  if (!element || list.length === 0 || reducedMotion()) return;

  let index = 0;
  let count = list[0]?.length ?? 0;
  let deleting = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const animation = blink(caretEl.value);

  // Ketik satu huruf, jeda di kata penuh, hapus, lalu pindah ke kata berikutnya.
  const step = () => {
    const chars = list[index] ?? [];
    let delay = deleting ? props.deleteSpeed : props.typeSpeed;
    if (!deleting && count >= chars.length) {
      if (!props.loop && index === list.length - 1) return;
      deleting = true;
      delay = props.pause;
    } else if (deleting && count === 0) {
      deleting = false;
      index = (index + 1) % list.length;
    } else {
      count += deleting ? -1 : 1;
      text.value = chars.slice(0, count).join("");
    }
    timer = setTimeout(step, delay);
  };

  const stop = onVisibility(element, (visible) => {
    clearTimeout(timer);
    if (visible) step();
  });
  cleanup = () => {
    stop();
    clearTimeout(timer);
    animation?.cancel();
  };
}

onMounted(start);
watch(
  () => [
    props.words.join("\n"),
    props.typeSpeed,
    props.deleteSpeed,
    props.pause,
    props.loop,
    props.cursor,
  ],
  start,
  { flush: "post" },
);
onBeforeUnmount(() => cleanup());
</script>

<template>
  <span ref="rootRef" :class="root"
    ><span class="sr-only">{{ props.words.join(", ") }}</span
    ><span aria-hidden="true">{{ text }}</span
    ><span
      v-if="props.cursor"
      ref="caretRef"
      aria-hidden="true"
      :class="caret"
    ></span
  ></span>
</template>
