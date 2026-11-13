import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0";
const star =
  "absolute rounded-full bg-ink animate-[markas-star-blink_3s_ease-in-out_infinite] motion-reduce:animate-none";
const streak =
  "absolute h-px rounded-full bg-linear-to-r from-ink via-current to-transparent [transform:rotate(215deg)] animate-[markas-shooting-star_9s_ease-out_infinite] motion-reduce:animate-none";
const content = "relative";
const trailColors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const variants = {
  night: { glow: "", trail: "primary", sky: 100 },
  dawn: {
    glow: "absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-warning/25 via-danger/5 to-transparent",
    trail: "warning",
    sky: 60,
  },
} as const;
/** One animation cycle in milliseconds; three shooting stars share a cycle, so one appears every third of it. */
const frequencies = { low: 15000, normal: 9000, high: 4500 };
const keyframes =
  "@keyframes markas-star-blink{50%{opacity:.2}}@keyframes markas-shooting-star{0%{transform:rotate(215deg) translateX(0);opacity:0}2%{opacity:1}14%,to{transform:rotate(215deg) translateX(-360px);opacity:0}}";

/** Park-Miller: integer math only, so every framework draws the same sky. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_STARS = 300;
const STREAKS = 3;
const JITTER_MS = 1000;

export type ShootingStarsVariant = keyof typeof variants;
export type ShootingStarsFrequency = keyof typeof frequencies;
export type ShootingStarsTrailColor = keyof typeof trailColors;

function makeSky(
  variant: ShootingStarsVariant,
  count: number,
  seed: number,
  frequency: ShootingStarsFrequency,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_STARS));
  const sky = variants[variant].sky;
  const stars = Array.from({ length: total }, () => {
    const size = next() % 6 === 0 ? 2 : 1;
    const left = (next() % 10000) / 100;
    const top = (next() % (sky * 100)) / 100;
    const opacity = ((next() % 6) + 3) / 10;
    const delay = (next() % 30) * 100;
    const duration = (next() % 3) + 2;
    return `left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; opacity: ${opacity}; animation-delay: ${delay}ms; animation-duration: ${duration}s`;
  });
  const cycle = frequencies[frequency] ?? frequencies.normal;
  const streaks = Array.from({ length: STREAKS }, (_, i) => {
    const left = 20 + (next() % 60);
    const top = next() % 45;
    const width = 80 + (next() % 60);
    const delay = -(
      ((STREAKS - i) % STREAKS) * (cycle / STREAKS) +
      (next() % JITTER_MS)
    );
    return `left: ${left}%; top: ${top}%; width: ${width}px; animation-duration: ${cycle}ms; animation-delay: ${delay}ms`;
  });
  return { stars, streaks };
}

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-shooting-stars]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      @if (config().glow) {
        <div [class]="config().glow"></div>
      }
      @for (style of sky().stars; track $index) {
        <span [class]="star" [style]="style"></span>
      }
      @for (style of sky().streaks; track $index) {
        <span [class]="streak" [style]="style"></span>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class ShootingStars {
  readonly variant = input<ShootingStarsVariant>("night");
  readonly frequency = input<ShootingStarsFrequency>("normal");
  readonly trailColor = input<ShootingStarsTrailColor>();
  readonly stars = input(70, { transform: numberAttribute });
  readonly seed = input(11, { transform: numberAttribute });

  protected readonly base = base;
  protected readonly star = star;
  protected readonly streak = streak;
  protected readonly content = content;
  private readonly key = computed<ShootingStarsVariant>(() =>
    this.variant() in variants ? this.variant() : "night",
  );
  protected readonly config = computed(() => variants[this.key()]);
  protected readonly layerClasses = computed(
    () =>
      `${layer} ${trailColors[this.trailColor() ?? this.config().trail] ?? trailColors.primary}`,
  );
  protected readonly sky = computed(() =>
    makeSky(this.key(), this.stars(), this.seed(), this.frequency()),
  );
}
