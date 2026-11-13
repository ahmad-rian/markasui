import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base = "group/sparkles relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const sparkle = "absolute -translate-1/2 fill-current";
const content = "relative";
const colors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const twinkle =
  "animate-[markas-sparkle_3s_ease-in-out_infinite] motion-reduce:animate-none";
const variants = {
  field: twinkle,
  text: twinkle,
  burst:
    "top-1/2 left-1/2 opacity-0 motion-safe:group-focus-within/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite] motion-safe:group-hover/sparkles:animate-[markas-sparkle-burst_1.2s_ease-out_infinite]",
};
/** Smallest size and extra range in pixels. */
const sizes = { sm: [4, 4], md: [6, 6], lg: [10, 8] } as const;
const star =
  "M12 0C12.6 6.6 17.4 11.4 24 12C17.4 12.6 12.6 17.4 12 24C11.4 17.4 6.6 12.6 0 12C6.6 11.4 11.4 6.6 12 0Z";
const keyframes =
  "@keyframes markas-sparkle{0%,to{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1) rotate(45deg)}}@keyframes markas-sparkle-burst{0%{opacity:0;transform:translate(0,0) scale(.3)}30%{opacity:1}to{opacity:0;transform:translate(var(--markas-sparkle-x),var(--markas-sparkle-y)) scale(1) rotate(90deg)}}";

/** Park-Miller: integer math only, so every framework draws the same sparkles. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_SPARKLES = 120;
const BURST_X = 240;
const BURST_Y = 140;
const BURST_DELAY_MS = 600;
const EDGE = 1500;

export type SparklesVariant = keyof typeof variants;
export type SparklesSize = keyof typeof sizes;
export type SparklesColor = keyof typeof colors;

/** Position in percent: anywhere in the area (field), or in a band along the top, bottom, left, or right edge (text). */
function place(variant: SparklesVariant, next: () => number) {
  if (variant === "field")
    return [(next() % 10000) / 100, (next() % 10000) / 100];
  const side = next() % 4;
  const along = (next() % 10000) / 100;
  const near = (next() % EDGE) / 100;
  const far = (10000 - (next() % EDGE)) / 100;
  return [[along, along, near, far][side], [near, far, along, along][side]];
}

function makeSparkles(
  variant: SparklesVariant,
  density: number,
  seed: number,
  size: SparklesSize,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(density), MAX_SPARKLES));
  const [minSize, sizeRange] = sizes[size] ?? sizes.md;
  return Array.from({ length: total }, () => {
    const px = `${minSize + (next() % sizeRange)}px`;
    const dot = variant === "field" && next() % 3 === 0;
    if (variant === "burst") {
      const delay = next() % BURST_DELAY_MS;
      const x = (next() % BURST_X) - BURST_X / 2;
      const y = (next() % BURST_Y) - BURST_Y / 2;
      const style = `width: ${px}; height: ${px}; animation-delay: ${delay}ms; --markas-sparkle-x: ${x}px; --markas-sparkle-y: ${y}px`;
      return { dot, style };
    }
    const [left, top] = place(variant, next);
    const opacity = ((next() % 5) + 5) / 10;
    const delay = (next() % 30) * 100;
    const duration = (next() % 3) + 2;
    const style = `left: ${left}%; top: ${top}%; width: ${px}; height: ${px}; opacity: ${opacity}; animation-delay: ${delay}ms; animation-duration: ${duration}s`;
    return { dot, style };
  });
}

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-sparkles]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      @for (item of items(); track $index) {
        <svg
          [attr.class]="sparkleClasses()"
          [style]="item.style"
          viewBox="0 0 24 24"
        >
          @if (item.dot) {
            <circle cx="12" cy="12" r="5" />
          } @else {
            <path [attr.d]="star" />
          }
        </svg>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class Sparkles {
  readonly variant = input<SparklesVariant>("field");
  readonly density = input(24, { transform: numberAttribute });
  readonly size = input<SparklesSize>("md");
  readonly color = input<SparklesColor>("warning");
  readonly seed = input(5, { transform: numberAttribute });

  protected readonly base = base;
  protected readonly star = star;
  protected readonly content = content;
  private readonly key = computed<SparklesVariant>(() =>
    this.variant() in variants ? this.variant() : "field",
  );
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()] ?? colors.warning}`,
  );
  protected readonly sparkleClasses = computed(
    () => `${sparkle} ${variants[this.key()]}`,
  );
  protected readonly items = computed(() =>
    makeSparkles(this.key(), this.density(), this.seed(), this.size()),
  );
}
