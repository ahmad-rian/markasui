import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer = "absolute inset-0 overflow-hidden";
const grid =
  "absolute top-1/2 left-1/2 grid grid-cols-[repeat(var(--markas-boxes-cols),var(--markas-boxes-size))] auto-rows-[var(--markas-boxes-size)] border-t border-l border-line";
const cell =
  "border-r border-b border-line transition-colors duration-1000 ease-out hover:bg-current/40 hover:duration-0 motion-reduce:transition-none";
const ember =
  "animate-[markas-boxes-glow_var(--markas-boxes-duration)_ease-in-out_infinite] motion-reduce:animate-none";
const content =
  "pointer-events-none relative [&_:is(a,button,input,select,textarea,label,summary)]:pointer-events-auto";
const variants = {
  skewed: {
    layer:
      "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]",
    grid: "[transform:translate(-50%,-50%)_skewX(-48deg)_skewY(14deg)]",
  },
  flat: {
    layer:
      "[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]",
    grid: "-translate-x-1/2 -translate-y-1/2",
  },
  perspective: {
    layer:
      "[perspective:520px] [mask-image:linear-gradient(to_bottom,transparent_25%,black_60%)]",
    grid: "[transform:translate(-50%,-38%)_rotateX(58deg)]",
  },
};
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "9s", normal: "6s", fast: "3.5s" };
const keyframes =
  "@keyframes markas-boxes-glow{0%,100%{box-shadow:none}50%{box-shadow:inset 0 0 0 999px color-mix(in oklab,currentColor 30%,transparent)}}";
const MAX_CELLS = 600;
const MAX_SIDE = 40;
const EMBER_TARGET = 6;
const EMBER_DELAY_MS = 700;

export type BackgroundBoxesVariant = keyof typeof variants;
export type BackgroundBoxesSpeed = keyof typeof speeds;
export type BackgroundBoxesColor = keyof typeof colors;

const side = (value: number) =>
  Math.max(1, Math.min(Math.trunc(value), MAX_SIDE));

/** Sel ke-i. Sekitar 6% sel (dua modulus berbeda supaya tidak membentuk garis) menyala pelan supaya latar terasa hidup tanpa hover. */
function makeCells(rows: number, cols: number) {
  const columns = side(cols);
  const total = Math.min(side(rows) * columns, MAX_CELLS);
  return Array.from({ length: total }, (_, index) => {
    const lit = ((index * 7) % 13) + ((index * index) % 11) === EMBER_TARGET;
    return lit
      ? {
          className: `${cell} ${ember}`,
          style: `animation-delay:${(index % 9) * -EMBER_DELAY_MS}ms`,
        }
      : { className: cell, style: null };
  });
}

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-background-boxes]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "base",
    "[style.--markas-boxes-cols]": "columns()",
    "[style.--markas-boxes-size]": "size() + 'px'",
    "[style.--markas-boxes-duration]": "duration()",
  },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      <div [class]="gridClasses()">
        @for (item of cells(); track $index) {
          <span [class]="item.className" [style]="item.style"></span>
        }
      </div>
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class BackgroundBoxes {
  readonly variant = input<BackgroundBoxesVariant>("skewed");
  readonly rows = input(12, { transform: numberAttribute });
  readonly cols = input(18, { transform: numberAttribute });
  readonly size = input(40, { transform: numberAttribute });
  readonly speed = input<BackgroundBoxesSpeed>("normal");
  readonly color = input<BackgroundBoxesColor>("primary");

  protected readonly base = base;
  protected readonly content = content;
  protected readonly columns = computed(() => side(this.cols()));
  protected readonly duration = computed(() => speeds[this.speed()]);
  protected readonly layerClasses = computed(
    () => `${layer} ${variants[this.variant()].layer} ${colors[this.color()]}`,
  );
  protected readonly gridClasses = computed(
    () => `${grid} ${variants[this.variant()].grid}`,
  );
  protected readonly cells = computed(() =>
    makeCells(this.rows(), this.cols()),
  );
}
