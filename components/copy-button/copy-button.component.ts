import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

const wrapper = "contents";
const base =
  "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
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
const iconSizes = {
  sm: "size-8 rounded-md text-sm",
  md: "size-10 rounded-lg text-sm",
  lg: "size-12 rounded-lg text-base",
};
const iconStack = "grid size-4 shrink-0 place-items-center";
const copyIcon =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-50 group-data-[state=copied]:opacity-0 motion-reduce:transition-none";
const checkIcon =
  "col-start-1 row-start-1 size-4 scale-50 opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=copied]:scale-100 group-data-[state=copied]:opacity-100 motion-reduce:transition-none";
const checkPath =
  "[stroke-dasharray:24] [stroke-dashoffset:24] transition-[stroke-dashoffset] delay-100 duration-300 ease-out group-data-[state=copied]:[stroke-dashoffset:0] motion-reduce:transition-none";
const srOnly = "sr-only";

/** How long the check mark stays before the button returns to idle. */
const RESET_DELAY = 2000;

export type CopyButtonVariant = keyof typeof variants;
export type CopyButtonSize = keyof typeof sizes;

/**
 * Host stays out of layout (display: contents). id, aria-label, title, and class move to the
 * button. Without projected content the button is square and named by copyLabel.
 */
@Component({
  selector: "markas-copy-button",
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
        [attr.data-state]="copied() ? 'copied' : 'idle'"
        [class]="classes()"
        (click)="copy()"
      >
        <span [class]="iconStack" aria-hidden="true">
          <svg
            [class]="copyIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path
              d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
            />
          </svg>
          <svg
            [class]="checkIcon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path [class]="checkPath" d="m4 12 5 5L20 6" />
          </svg>
        </span>
        <ng-content
          ><span #fallback [class]="srOnly">{{ copyLabel() }}</span></ng-content
        >
      </button>
      <span role="status" [class]="srOnly">{{
        copied() ? copiedLabel() : ""
      }}</span>
    </span>
  `,
})
export class CopyButton {
  /** Text written to the clipboard. */
  readonly text = input.required<string>();
  readonly variant = input<CopyButtonVariant>("primary");
  readonly size = input<CopyButtonSize>("md");
  readonly copyLabel = input("Copy");
  readonly copiedLabel = input("Copied");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  readonly title = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });

  protected readonly wrapper = wrapper;
  protected readonly iconStack = iconStack;
  protected readonly copyIcon = copyIcon;
  protected readonly checkIcon = checkIcon;
  protected readonly checkPath = checkPath;
  protected readonly srOnly = srOnly;
  protected readonly copied = signal(false);
  private readonly hasLabel = signal(true);
  protected readonly classes = computed(() =>
    [
      base,
      variants[this.variant()],
      this.hasLabel() ? sizes[this.size()] : iconSizes[this.size()],
      this.userClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );
  private readonly fallback = viewChild<ElementRef<HTMLElement>>("fallback");
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => this.hasLabel.set(!this.fallback()));
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy() {
    try {
      await navigator.clipboard.writeText(this.text());
    } catch {
      // Clipboard blocked or unavailable: stay idle so the check mark never lies.
      return;
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), RESET_DELAY);
  }
}
