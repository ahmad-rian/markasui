"use client";

import {
  useSyncExternalStore,
  type ComponentProps,
  type FocusEvent,
  type MouseEvent,
} from "react";

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
const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

const DEFAULT_DURATION = 5000;

export type ToastVariant = keyof typeof variants;
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
const EMPTY: ToastItem[] = [];
let toasts: ToastItem[] = EMPTY;
let nextId = 0;
const listeners = new Set<() => void>();
const timers = new Map<number, Timer>();

const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

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
  toasts = toasts.filter((item) => item.id !== id);
  emit();
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
  toasts = [...toasts, { id, title, description, variant, duration }];
  if (duration > 0) startTimer(id, duration);
  emit();
  return id;
}

export type ToasterProps = ComponentProps<"div"> & {
  /** Label aksesibel tombol tutup di setiap toast. */
  closeLabel?: string;
  /** Label aksesibel region live. */
  regionLabel?: string;
};

export function Toaster({
  closeLabel = "Close",
  regionLabel = "Notifications",
  className,
  ...props
}: ToasterProps) {
  const items = useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );

  const handleMouseLeave = (id: number, event: MouseEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(document.activeElement)) resumeToast(id);
  };
  const handleBlur = (id: number, event: FocusEvent<HTMLElement>) => {
    const target = event.currentTarget;
    if (target.contains(event.relatedTarget) || target.matches(":hover"))
      return;
    resumeToast(id);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={regionLabel}
      className={cx(region, className)}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-state="open"
          className={cx(card, variants[item.variant])}
          onMouseEnter={() => pauseToast(item.id)}
          onMouseLeave={(event) => handleMouseLeave(item.id, event)}
          onFocus={() => pauseToast(item.id)}
          onBlur={(event) => handleBlur(item.id, event)}
        >
          {icons[item.variant] && (
            <svg
              className={cx(iconBase, iconVariants[item.variant])}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d={icons[item.variant]} />
            </svg>
          )}
          <div className={content}>
            <p className={titleClass}>{item.title}</p>
            {item.description && (
              <p className={descriptionClass}>{item.description}</p>
            )}
          </div>
          <button
            type="button"
            className={close}
            aria-label={closeLabel}
            onClick={() => dismissToast(item.id)}
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
