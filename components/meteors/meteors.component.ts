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
const meteor =
  "absolute rounded-full bg-current [transform:rotate(var(--markas-meteor-angle))] animate-[markas-meteor_6s_linear_infinite] motion-reduce:animate-none before:absolute before:top-1/2 before:left-1/2 before:w-(--markas-meteor-tail) before:-translate-y-1/2 before:rounded-full before:bg-linear-to-r before:from-current before:to-transparent";
const content = "relative";
const colors = {
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const variants = {
  rain: { meteor: "size-px before:h-px", count: 20, tail: [40, 60] as const },
  comet: {
    meteor: "size-1 shadow-[0_0_8px_2px_currentColor] before:h-0.5",
    count: 6,
    tail: [100, 80] as const,
  },
};
/** Minimum duration and extra range in seconds. */
const speeds = { slow: [9, 6], normal: [5, 4], fast: [2, 3] } as const;
const keyframes =
  "@keyframes markas-meteor{0%{transform:rotate(var(--markas-meteor-angle)) translateX(0);opacity:1}70%{opacity:1}to{transform:rotate(var(--markas-meteor-angle)) translateX(-640px);opacity:0}}";

/** Park-Miller: integer math only, so every framework draws the same meteors. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_METEORS = 60;
const MAX_ANGLE = 180;

export type MeteorsVariant = keyof typeof variants;
export type MeteorsSpeed = keyof typeof speeds;
export type MeteorsColor = keyof typeof colors;

function makeMeteors(
  variant: MeteorsVariant,
  count: number,
  seed: number,
  speed: MeteorsSpeed,
) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_METEORS));
  const [minTail, tailRange] = variants[variant].tail;
  const [minSeconds, secondsRange] = speeds[speed] ?? speeds.normal;
  return Array.from({ length: total }, () => {
    const seconds = minSeconds + (next() % secondsRange);
    const left = next() % 100;
    const top = (next() % 70) - 10;
    const opacity = ((next() % 5) + 5) / 10;
    const delay = -(next() % (seconds * 10)) * 100;
    const tail = minTail + (next() % tailRange);
    return `left: ${left}%; top: ${top}%; opacity: ${opacity}; animation-duration: ${seconds}s; animation-delay: ${delay}ms; --markas-meteor-tail: ${tail}px`;
  });
}

/** Empty attribute or no value: undefined, so the variant picks its own count. */
const optionalNumber = (value: unknown) =>
  value == null || value === "" ? undefined : numberAttribute(value);

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-meteors]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div
      aria-hidden="true"
      [class]="layerClasses()"
      [style.--markas-meteor-angle]="turn()"
    >
      @for (style of items(); track $index) {
        <span [class]="meteorClasses()" [style]="style"></span>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class Meteors {
  readonly variant = input<MeteorsVariant>("rain");
  readonly count = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  readonly angle = input(35, { transform: numberAttribute });
  readonly speed = input<MeteorsSpeed>("normal");
  readonly color = input<MeteorsColor>("primary");
  readonly seed = input(3, { transform: numberAttribute });

  protected readonly base = base;
  protected readonly content = content;
  private readonly key = computed<MeteorsVariant>(() =>
    this.variant() in variants ? this.variant() : "rain",
  );
  protected readonly turn = computed(
    () =>
      `${180 + Math.max(0, Math.min(Math.trunc(this.angle()), MAX_ANGLE))}deg`,
  );
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()] ?? colors.primary}`,
  );
  protected readonly meteorClasses = computed(
    () => `${meteor} ${variants[this.key()].meteor}`,
  );
  protected readonly items = computed(() =>
    makeMeteors(
      this.key(),
      this.count() ?? variants[this.key()].count,
      this.seed(),
      this.speed(),
    ),
  );
}
