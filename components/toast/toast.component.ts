import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from "@angular/core";

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

const DEFAULT_DURATION = 5000;

export type ToastVariant = keyof typeof variants;
export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Milliseconds before the toast dismisses itself. 0 keeps it open. */
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

// Module store: one toast queue for the whole app.
const toasts = signal<ToastItem[]>([]);
const timers = new Map<number, Timer>();
/** Mounted Toasters render right away, so a toast shows even when timers are paused or faked. */
const renderers = new Set<() => void>();
let nextId = 0;

const update = (change: (items: ToastItem[]) => ToastItem[]) => {
  toasts.update(change);
  renderers.forEach((render) => render());
};

/** On the server (SSR) there is no queue or timer, so every toast function does nothing. */
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
  update((items) => items.filter((item) => item.id !== id));
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

/** Show a toast from anywhere. Returns an id for dismissToast(), or 0 on the server. */
export function toast({
  title,
  description,
  variant = "default",
  duration = DEFAULT_DURATION,
}: ToastOptions): number {
  if (isServer()) return 0;
  const id = ++nextId;
  update((items) => [...items, { id, title, description, variant, duration }]);
  if (duration > 0) startTimer(id, duration);
  return id;
}

/**
 * Mount once in the app shell. Host stays out of layout (display: contents); the class moves to
 * the live region.
 */
@Component({
  selector: "markas-toaster",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div
      role="status"
      aria-live="polite"
      [attr.aria-label]="regionLabel()"
      [class]="regionClasses()"
    >
      @for (item of toasts(); track item.id) {
        <div
          data-state="open"
          [class]="cardClasses[item.variant]"
          (mouseenter)="pause(item.id)"
          (mouseleave)="onMouseLeave(item.id, $event)"
          (focusin)="pause(item.id)"
          (focusout)="onFocusOut(item.id, $event)"
        >
          @if (icons[item.variant]) {
            <svg
              [class]="iconClasses[item.variant]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path [attr.d]="icons[item.variant]" />
            </svg>
          }
          <div [class]="content">
            <p [class]="titleClass">{{ item.title }}</p>
            @if (item.description) {
              <p [class]="descriptionClass">{{ item.description }}</p>
            }
          </div>
          <button
            type="button"
            [class]="close"
            [attr.aria-label]="closeLabel()"
            (click)="dismiss(item.id)"
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
      }
    </div>
  `,
})
export class Toaster {
  /** Accessible label of the close button on each toast. */
  readonly closeLabel = input("Close");
  /** Accessible label of the live region. */
  readonly regionLabel = input("Notifications");
  readonly userClass = input("", { alias: "class" });

  protected readonly toasts = toasts.asReadonly();
  protected readonly icons = icons;
  protected readonly content = content;
  protected readonly titleClass = titleClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly close = close;
  protected readonly cardClasses = {
    default: `${card} ${variants.default}`,
    success: `${card} ${variants.success}`,
    danger: `${card} ${variants.danger}`,
  };
  protected readonly iconClasses = {
    default: `${iconBase} ${iconVariants.default}`,
    success: `${iconBase} ${iconVariants.success}`,
    danger: `${iconBase} ${iconVariants.danger}`,
  };
  protected readonly regionClasses = computed(() =>
    [region, this.userClass()].filter(Boolean).join(" "),
  );

  constructor() {
    const changes = inject(ChangeDetectorRef);
    const render = () => changes.detectChanges();
    renderers.add(render);
    inject(DestroyRef).onDestroy(() => renderers.delete(render));
  }

  protected pause(id: number) {
    pauseToast(id);
  }

  protected dismiss(id: number) {
    dismissToast(id);
  }

  protected onMouseLeave(id: number, event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    if (!target.contains(document.activeElement)) resumeToast(id);
  }

  protected onFocusOut(id: number, event: FocusEvent) {
    const target = event.currentTarget as HTMLElement;
    if (target.contains(event.relatedTarget as Node | null)) return;
    if (target.matches(":hover")) return;
    resumeToast(id);
  }
}
