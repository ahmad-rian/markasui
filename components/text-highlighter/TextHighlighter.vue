<script setup lang="ts">
import { ref, useTemplateRef, watchPostEffect } from "vue";

type Direction = "ltr" | "rtl" | "ttb" | "btt";

const props = withDefaults(
  defineProps<{
    as?: string;
    trigger?: "view" | "hover" | "auto" | "manual";
    direction?: Direction;
    variant?: "solid" | "marker" | "underline" | "gradient";
    color?: "warning" | "primary" | "primary-soft" | "success" | "danger";
    /** Keadaan sorotan untuk trigger manual. */
    active?: boolean;
    /** Trigger view: sorot sekali saja, atau hapus lagi saat keluar layar. */
    once?: boolean;
    /** Trigger view: bagian teks yang harus terlihat (0 sampai 1). */
    threshold?: number;
    duration?: number;
    delay?: number;
  }>(),
  {
    as: "span",
    trigger: "view",
    direction: "ltr",
    variant: "solid",
    color: "warning",
    active: false,
    once: true,
    threshold: 0.5,
    duration: 700,
    delay: 0,
  },
);

const base =
  "bg-transparent text-ink bg-no-repeat box-decoration-clone [--markas-th-fill:color-mix(in_oklab,var(--markas-th-c)_var(--markas-th-a,28%),transparent)] -mx-[0.12em] px-[0.12em] bg-left [background-size:var(--markas-th-size,0%_100%)] data-[direction=rtl]:bg-right data-[direction=ttb]:bg-top data-[direction=btt]:bg-bottom data-[direction$=b]:[--markas-th-size:100%_0%] data-[state=active]:[background-size:100%_100%] transition-[background-size] ease-out motion-reduce:transition-none motion-reduce:data-[trigger=view]:[background-size:100%_100%] motion-reduce:data-[trigger=auto]:[background-size:100%_100%]";
const variants = {
  solid:
    "rounded-[0.2em] [background-image:linear-gradient(var(--markas-th-fill)_0_0)]",
  marker:
    "rounded-[0.1em_0.5em_0.2em_0.6em] [background-image:linear-gradient(transparent_40%,var(--markas-th-fill)_40%_94%,transparent_94%)]",
  underline:
    "[background-image:linear-gradient(transparent_84%,var(--markas-th-c)_84%)]",
  gradient:
    "rounded-[0.2em] [background-image:linear-gradient(100deg,var(--markas-th-fill),color-mix(in_oklab,var(--markas-th-c2,var(--color-warning))_var(--markas-th-a,28%),transparent))]",
};
const colors = {
  warning:
    "[--markas-th-c:var(--color-warning)] [--markas-th-c2:var(--color-danger)]",
  primary: "[--markas-th-a:16%] [--markas-th-c:var(--color-primary)]",
  "primary-soft":
    "[--markas-th-a:100%] [--markas-th-c:var(--color-primary-soft)]",
  success: "[--markas-th-c:var(--color-success)]",
  danger: "[--markas-th-c:var(--color-danger)]",
};

/** Hover dan fokus didengar di elemen interaktif terdekat (link, tombol), atau di teks itu sendiri. */
const TRIGGER = "a, button, label, [tabindex]";
/** Dua event pertama menyalakan sorotan, dua terakhir mematikannya. */
const EVENTS = ["pointerenter", "focusin", "pointerleave", "focusout"];

const on = ref(props.active);
/** Arah dari animate(direction) menimpa prop direction. */
const override = ref<Direction>();
const rootEl = useTemplateRef<HTMLElement>("rootRef");
// Dijalankan ulang (dengan cleanup) setiap kali trigger, once, threshold, atau active berubah.
watchPostEffect((onCleanup) => {
  const element = rootEl.value;
  const { trigger, once, threshold } = props;
  if (trigger === "manual") on.value = props.active;
  if (!element || trigger === "manual") return;
  if (trigger === "hover") {
    const target = element.closest<HTMLElement>(TRIGGER) ?? element;
    const toggle = (event: Event) =>
      (on.value = EVENTS.indexOf(event.type) < 2);
    EVENTS.forEach((name) => target.addEventListener(name, toggle));
    onCleanup(() =>
      EVENTS.forEach((name) => target.removeEventListener(name, toggle)),
    );
    return;
  }
  // Auto langsung menyorot. offsetWidth menghitung gaya awal dulu supaya transisi berjalan dari keadaan kosong.
  if (trigger === "auto") {
    void element.offsetWidth;
    on.value = true;
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible && once) observer.disconnect();
      if (visible || !once) on.value = visible;
    },
    { threshold },
  );
  observer.observe(element);
  onCleanup(() => observer.disconnect());
});

defineExpose({
  /** Sorot teks, opsional dengan arah lain. */
  animate(next?: Direction) {
    if (next) override.value = next;
    on.value = true;
  },
  /** Hapus sorotan. */
  reset() {
    on.value = false;
  },
});
</script>

<template>
  <component
    :is="props.as"
    ref="rootRef"
    :data-state="on ? 'active' : 'inactive'"
    :data-direction="override ?? props.direction"
    :data-trigger="props.trigger"
    :class="[base, variants[props.variant], colors[props.color]]"
    :style="{
      transitionDuration: `${props.duration}ms`,
      transitionDelay: `${props.delay}ms`,
    }"
    ><slot
  /></component>
</template>
