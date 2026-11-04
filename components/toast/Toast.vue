<script lang="ts">
import { shallowRef } from "vue";

const DEFAULT_DURATION = 5000;

export type ToastVariant = "default" | "success" | "danger";
export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Milidetik sebelum toast hilang sendiri. 0 berarti tetap tampil. */
  duration?: number;
};
type ToastItem = Required<Omit<ToastOptions, "description">> & {
  id: number;
  description?: string;
};
type Timer = {
  handle?: ReturnType<typeof setTimeout>;
  remaining: number;
  startedAt: number;
};

// Store modul: satu antrean toast untuk seluruh aplikasi.
const toasts = shallowRef<ToastItem[]>([]);
const timers = new Map<number, Timer>();
let nextId = 0;

/** Di server (SSR) tidak ada antrean maupun timer, jadi semua fungsi toast tidak melakukan apa pun. */
const isServer = () => typeof window === "undefined";

function startTimer(id: number, ms: number) {
  timers.set(id, {
    handle: setTimeout(() => dismissToast(id), ms),
    remaining: ms,
    startedAt: Date.now(),
  });
}

export function dismissToast(id: number) {
  if (isServer()) return;
  clearTimeout(timers.get(id)?.handle);
  timers.delete(id);
  toasts.value = toasts.value.filter((item) => item.id !== id);
}

export function pauseToast(id: number) {
  if (isServer()) return;
  const timer = timers.get(id);
  if (!timer?.handle) return;
  clearTimeout(timer.handle);
  timers.set(id, {
    remaining: timer.remaining - (Date.now() - timer.startedAt),
    startedAt: 0,
  });
}

export function resumeToast(id: number) {
  if (isServer()) return;
  const timer = timers.get(id);
  if (!timer || timer.handle) return;
  startTimer(id, Math.max(timer.remaining, 0));
}

/** Tampilkan toast dari mana saja. Mengembalikan id untuk dismissToast(), atau 0 di server. */
export function toast({
  title,
  description,
  variant = "default",
  duration = DEFAULT_DURATION,
}: ToastOptions): number {
  if (isServer()) return 0;
  const id = ++nextId;
  toasts.value = [
    ...toasts.value,
    { id, title, description, variant, duration },
  ];
  if (duration > 0) startTimer(id, duration);
  return id;
}
</script>

<script setup lang="ts">
const region =
  "pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2";
const card =
  "pointer-events-auto flex items-start gap-3 rounded-lg border bg-surface p-4 text-sm text-ink shadow-overlay transition-[opacity,translate] duration-200 ease-out starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none";
const variants = {
  default: "border-line",
  success: "border-success/40",
  danger: "border-danger/40",
};
const iconBase = "mt-0.5 size-4 shrink-0";
const iconVariants = {
  default: "",
  success: "text-success",
  danger: "text-danger",
};
const icons = {
  default: "",
  success: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8.5 12l2.5 2.5 4.5-5",
  danger: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM15 9l-6 6M9 9l6 6",
};
const content = "grid flex-1 gap-1";
const titleClass = "font-semibold";
const descriptionClass = "text-muted";
const close =
  "-mt-1 -mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

function onMouseLeave(id: number, event: MouseEvent) {
  const target = event.currentTarget as HTMLElement;
  if (!target.contains(document.activeElement)) resumeToast(id);
}

function onFocusOut(id: number, event: FocusEvent) {
  const target = event.currentTarget as HTMLElement;
  if (target.contains(event.relatedTarget as Node | null)) return;
  if (target.matches(":hover")) return;
  resumeToast(id);
}
</script>

<template>
  <div role="status" aria-live="polite" aria-label="Notifikasi" :class="region">
    <div
      v-for="item in toasts"
      :key="item.id"
      data-state="open"
      :class="[card, variants[item.variant]]"
      @mouseenter="pauseToast(item.id)"
      @mouseleave="onMouseLeave(item.id, $event)"
      @focusin="pauseToast(item.id)"
      @focusout="onFocusOut(item.id, $event)"
    >
      <svg
        v-if="icons[item.variant]"
        :class="[iconBase, iconVariants[item.variant]]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path :d="icons[item.variant]" />
      </svg>
      <div :class="content">
        <p :class="titleClass">{{ item.title }}</p>
        <p v-if="item.description" :class="descriptionClass">
          {{ item.description }}
        </p>
      </div>
      <button
        type="button"
        :class="close"
        aria-label="Tutup"
        @click="dismissToast(item.id)"
      >
        <svg
          class="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
