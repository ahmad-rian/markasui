import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  numberAttribute,
  viewChild,
} from "@angular/core";

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
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
const sheen =
  "pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent to-transparent";
const sheenVariants = {
  primary: "via-on-primary/30",
  secondary: "via-primary/10",
  ghost: "via-primary/10",
  danger: "via-on-primary/30",
};

/** The sheen sweeps across in the first 60% of each cycle, then rests off the button. */
const SWEEP = [
  { translate: "0 0" },
  { translate: "300% 0", offset: 0.6 },
  { translate: "300% 0" },
];
const DEFAULT_DURATION = 2400;

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type ShimmerButtonVariant = keyof typeof variants;
export type ShimmerButtonSize = keyof typeof sizes;

/**
 * Attribute selector on the native button: disabled, aria-*, name, value, and the user's
 * class stay on the button itself. The sweep pauses while the button is off screen.
 */
@Component({
  selector: "button[markas-shimmer-button]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[attr.type]": "type()", "[class]": "classes()" },
  template: `<ng-content /><span
      #sheen
      [class]="sheenClasses()"
      aria-hidden="true"
    ></span>`,
})
export class ShimmerButton {
  readonly variant = input<ShimmerButtonVariant>("primary");
  readonly size = input<ShimmerButtonSize>("md");
  /** Length of one shimmer cycle in milliseconds. */
  readonly duration = input(DEFAULT_DURATION, { transform: numberAttribute });
  readonly type = input<"button" | "submit" | "reset">("button");

  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]} ${sizes[this.size()]}`,
  );
  protected readonly sheenClasses = computed(
    () => `${sheen} ${sheenVariants[this.variant()]}`,
  );
  private readonly sheen =
    viewChild.required<ElementRef<HTMLSpanElement>>("sheen");

  constructor() {
    let stop = () => {};
    afterNextRender(() => {
      const element = this.sheen().nativeElement;
      const button = element.parentElement;
      if (!button || typeof element.animate !== "function") return;
      if (reducedMotion()) return;
      const animation = element.animate(SWEEP, {
        duration: this.duration(),
        iterations: Infinity,
        easing: "ease-in-out",
      });
      stop = () => animation.cancel();
      if (typeof IntersectionObserver === "undefined") return;
      // Pause while the button is off screen.
      const observer = new IntersectionObserver(([entry]) =>
        entry?.isIntersecting ? animation.play() : animation.pause(),
      );
      observer.observe(button);
      stop = () => {
        observer.disconnect();
        animation.cancel();
      };
    });
    inject(DestroyRef).onDestroy(() => stop());
  }
}
