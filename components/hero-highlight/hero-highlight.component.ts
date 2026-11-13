import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base =
  "group/highlight relative isolate overflow-hidden [--markas-hh-x:50%] [--markas-hh-y:50%] [--markas-hh-play:paused] data-[visible]:[--markas-hh-play:running] [&_mark]:rounded-md [&_mark]:bg-transparent [&_mark]:bg-[linear-gradient(to_right,color-mix(in_oklab,var(--markas-hh-color)_18%,transparent),color-mix(in_oklab,var(--markas-hh-color)_34%,transparent))] [&_mark]:[background-size:100%_100%] [&_mark]:bg-left [&_mark]:bg-no-repeat [&_mark]:box-decoration-clone [&_mark]:px-1 [&_mark]:text-ink [&_mark]:animate-[markas-highlight_var(--markas-hh-speed)_cubic-bezier(0.22,1,0.36,1)_0.3s_both_var(--markas-hh-play)] motion-reduce:[&_mark]:animate-none";
const layer = "pointer-events-none absolute inset-0";
const dim = "absolute inset-0 text-muted/20";
const glow =
  "absolute inset-0 text-[var(--markas-hh-color)] opacity-0 transition-opacity duration-300 ease-out [mask-image:radial-gradient(var(--markas-hh-radius)_circle_at_var(--markas-hh-x)_var(--markas-hh-y),black,transparent)] group-hover/highlight:opacity-100 motion-reduce:transition-none";
const content = "relative";
const variants = {
  dots: "bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]",
  grid: "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-hh-spacing)_var(--markas-hh-spacing)]",
};
const colors = {
  primary: "[--markas-hh-color:var(--markas-primary)]",
  success: "[--markas-hh-color:var(--markas-success)]",
  warning: "[--markas-hh-color:var(--markas-warning)]",
  danger: "[--markas-hh-color:var(--markas-danger)]",
};
const speeds = {
  slow: "[--markas-hh-speed:1.6s]",
  normal: "[--markas-hh-speed:1s]",
  fast: "[--markas-hh-speed:0.6s]",
};
const keyframes = "@keyframes markas-highlight{from{background-size:0% 100%}}";

export type HeroHighlightVariant = keyof typeof variants;
export type HeroHighlightColor = keyof typeof colors;
export type HeroHighlightSpeed = keyof typeof speeds;

/** Mark the root visible the first time it scrolls into view, which starts drawing the marks. */
function revealOnView(element: HTMLElement): (() => void) | undefined {
  const show = () => element.setAttribute("data-visible", "");
  if (typeof IntersectionObserver === "undefined") {
    show();
    return undefined;
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    show();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

/**
 * Attribute selector on a native div: the user's class, style, attributes, and
 * (pointermove) stay on the root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-hero-highlight]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "classes()",
    "[style.--markas-hh-spacing]": "spacing() + 'px'",
    "[style.--markas-hh-radius]": "radius() + 'px'",
    "(pointermove)": "track($event)",
  },
  template: `
    <div aria-hidden="true" [class]="layer">
      <div [class]="dimClasses()"></div>
      <div [class]="glowClasses()"></div>
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class HeroHighlight {
  /** dots: a dot grid; grid: thin grid lines. */
  readonly variant = input<HeroHighlightVariant>("dots");
  readonly color = input<HeroHighlightColor>("primary");
  /** Distance between dots or lines in px. */
  readonly spacing = input(16, { transform: numberAttribute });
  /** Radius of the glow around the pointer in px. */
  readonly radius = input(160, { transform: numberAttribute });
  /** How fast each mark draws from left to right. */
  readonly speed = input<HeroHighlightSpeed>("normal");

  protected readonly layer = layer;
  protected readonly content = content;
  protected readonly classes = computed(
    () => `${base} ${colors[this.color()]} ${speeds[this.speed()]}`,
  );
  private readonly pattern = computed(
    () => variants[this.variant()] ?? variants.dots,
  );
  protected readonly dimClasses = computed(() => `${dim} ${this.pattern()}`);
  protected readonly glowClasses = computed(() => `${glow} ${this.pattern()}`);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  constructor() {
    let stop: (() => void) | undefined;
    afterNextRender(() => {
      stop = revealOnView(this.host);
    });
    inject(DestroyRef).onDestroy(() => stop?.());
  }

  /** Store the pointer position so the bright dots gather around it. */
  protected track(event: PointerEvent) {
    const rect = this.host.getBoundingClientRect();
    this.host.style.setProperty(
      "--markas-hh-x",
      `${event.clientX - rect.left}px`,
    );
    this.host.style.setProperty(
      "--markas-hh-y",
      `${event.clientY - rect.top}px`,
    );
  }
}
