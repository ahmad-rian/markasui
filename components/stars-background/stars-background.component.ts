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
  "absolute rounded-full bg-current animate-[markas-twinkle_3s_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const keyframes = "@keyframes markas-twinkle{50%{opacity:.15}}";

/** Park-Miller: integer math only, so every framework draws the same stars. */
const MODULUS = 2147483647;
const MULTIPLIER = 48271;
const MAX_STARS = 400;

export type StarsBackgroundColor = keyof typeof colors;

function makeStars(count: number, seed: number) {
  let state = (Math.abs(Math.trunc(seed)) % (MODULUS - 1)) + 1;
  const next = () => (state = (state * MULTIPLIER) % MODULUS);
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_STARS));
  return Array.from({ length: total }, () => {
    const size = next() % 5 === 0 ? 2 : 1;
    const left = (next() % 10000) / 100;
    const top = (next() % 10000) / 100;
    const opacity = ((next() % 6) + 4) / 10;
    const delay = (next() % 30) * 100;
    const duration = (next() % 3) + 2;
    return `left: ${left}%; top: ${top}%; width: ${size}px; height: ${size}px; opacity: ${opacity}; animation-delay: ${delay}ms; animation-duration: ${duration}s`;
  });
}

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-stars-background]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      @for (style of items(); track $index) {
        <span [class]="star" [style]="style"></span>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class StarsBackground {
  readonly count = input(80, { transform: numberAttribute });
  readonly seed = input(7, { transform: numberAttribute });
  readonly color = input<StarsBackgroundColor>("primary");

  protected readonly base = base;
  protected readonly star = star;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]}`,
  );
  protected readonly items = computed(() =>
    makeStars(this.count(), this.seed()),
  );
}
