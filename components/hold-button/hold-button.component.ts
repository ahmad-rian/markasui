import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from "@angular/core";

const wrapper = "contents";
const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap select-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};
const fill =
  "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-200 ease-out group-data-[state=complete]:scale-x-100 group-data-[state=holding]:scale-x-100 group-data-[state=holding]:duration-(--hold-duration) group-data-[state=holding]:ease-linear";
const fillVariants = {
  primary: "bg-on-primary/25",
  secondary: "bg-primary/10",
  ghost: "bg-primary/10",
  danger: "bg-on-primary/25",
};
const srOnly = "sr-only";

const HOLD_KEYS = new Set([" ", "Enter"]);

let nextId = 0;

export type HoldButtonVariant = keyof typeof variants;
export type HoldButtonSize = keyof typeof sizes;
type HoldState = "idle" | "holding" | "complete";

/**
 * Host stays out of layout (display: contents). id, aria-label, title, and class move to the
 * button. Holding Space, Enter, or the pointer for the full duration emits `complete`.
 */
@Component({
  selector: "markas-hold-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
    "[attr.title]": "null",
  },
  template: `
    <span [class]="wrapper">
      <button
        [attr.type]="type()"
        [attr.id]="id() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.title]="title() ?? null"
        [disabled]="disabled()"
        [attr.data-state]="state()"
        [attr.aria-describedby]="hintId"
        [style.--hold-duration]="duration() + 'ms'"
        [class]="classes()"
        (pointerdown)="$event.button === 0 && start()"
        (pointerup)="cancel()"
        (pointerleave)="cancel()"
        (pointercancel)="cancel()"
        (keydown)="onKeydown($event)"
        (keyup)="onKeyup($event)"
        (blur)="cancel()"
        (contextmenu)="$event.preventDefault()"
      >
        <span [class]="fillClasses()" aria-hidden="true"></span>
        <ng-content />
      </button>
      <span [id]="hintId" [class]="srOnly">{{ holdLabel() }}</span>
    </span>
  `,
})
export class HoldButton {
  readonly variant = input<HoldButtonVariant>("primary");
  readonly size = input<HoldButtonSize>("md");
  /** How long the button must be held, in milliseconds. */
  readonly duration = input(1500, { transform: numberAttribute });
  /** Hidden hint read by screen readers. */
  readonly holdLabel = input("Press and hold to confirm");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  readonly title = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Emits once the hold reaches the full duration. */
  readonly complete = output<void>();

  protected readonly wrapper = wrapper;
  protected readonly srOnly = srOnly;
  protected readonly hintId = `markas-hold-button-${nextId++}`;
  protected readonly state = signal<HoldState>("idle");
  protected readonly classes = computed(() =>
    [base, variants[this.variant()], sizes[this.size()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly fillClasses = computed(
    () => `${fill} ${fillVariants[this.variant()]}`,
  );
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected start() {
    if (this.state() !== "idle") return;
    this.state.set("holding");
    this.timer = setTimeout(() => {
      this.state.set("complete");
      this.complete.emit();
    }, this.duration());
  }

  protected cancel() {
    clearTimeout(this.timer);
    this.state.set("idle");
  }

  protected onKeydown(event: KeyboardEvent) {
    if (!HOLD_KEYS.has(event.key)) return;
    event.preventDefault();
    if (!event.repeat) this.start();
  }

  protected onKeyup(event: KeyboardEvent) {
    if (HOLD_KEYS.has(event.key)) this.cancel();
  }
}
