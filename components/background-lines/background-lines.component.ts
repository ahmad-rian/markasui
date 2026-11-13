import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]";
const line =
  "animate-[markas-lines-draw_var(--markas-lines-duration)_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "12s", normal: "8s", fast: "5s" };
const keyframes =
  "@keyframes markas-lines-draw{0%{stroke-dashoffset:100}35%,65%{stroke-dashoffset:0}100%{stroke-dashoffset:-100}}";
const MAX_LINES = 24;
const LINE_DELAY_MS = 650;
const RAY_LENGTH = 900;

export type BackgroundLinesVariant = "waves" | "rays" | "lattice";
export type BackgroundLinesSpeed = keyof typeof speeds;
export type BackgroundLinesColor = keyof typeof colors;

/** Garis ke-i di kanvas 800x400. Hanya bilangan bulat (floor) supaya semua framework sama persis. */
function linePath(
  variant: BackgroundLinesVariant,
  index: number,
  total: number,
) {
  if (variant === "rays") {
    const angle =
      ((20 + (index * 140) / Math.max(1, total - 1)) * Math.PI) / 180;
    const x = 400 + Math.floor(Math.cos(angle) * RAY_LENGTH);
    const y = -40 + Math.floor(Math.sin(angle) * RAY_LENGTH);
    return `M 400 -40 L ${x} ${y}`;
  }
  if (variant === "lattice") {
    const pairs = Math.ceil(total / 2);
    const x =
      -400 + Math.floor(((2 * Math.floor(index / 2) + 1) * 800) / pairs);
    return index % 2 === 0
      ? `M ${x} 0 L ${x + 400} 400`
      : `M ${x} 400 L ${x + 400} 0`;
  }
  const y = Math.floor(((2 * index + 1) * 200) / total);
  const amp = (24 + (index % 4) * 10) * (index % 2 === 0 ? 1 : -1);
  return `M -40 ${y} C 160 ${y - amp}, 240 ${y + amp}, 400 ${y} S 640 ${y - amp}, 840 ${y}`;
}

function makeLines(variant: BackgroundLinesVariant, count: number) {
  const total = Math.max(0, Math.min(Math.trunc(count), MAX_LINES));
  return Array.from({ length: total }, (_, index) => ({
    d: linePath(variant, index, total),
    style: `opacity:${((index % 3) + 3) / 10};animation-delay:${index * -LINE_DELAY_MS}ms`,
  }));
}

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-background-lines]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "base",
    "[style.--markas-lines-duration]": "duration()",
  },
  template: `
    <svg
      aria-hidden="true"
      [class]="layerClasses()"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    >
      @for (item of lines(); track $index) {
        <path
          [class]="line"
          [attr.d]="item.d"
          pathLength="100"
          stroke-dasharray="100"
          [style]="item.style"
        />
      }
    </svg>
    <div [class]="content"><ng-content /></div>
  `,
})
export class BackgroundLines {
  readonly variant = input<BackgroundLinesVariant>("waves");
  readonly count = input(12, { transform: numberAttribute });
  readonly speed = input<BackgroundLinesSpeed>("normal");
  readonly color = input<BackgroundLinesColor>("primary");

  protected readonly base = base;
  protected readonly line = line;
  protected readonly content = content;
  protected readonly duration = computed(() => speeds[this.speed()]);
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]}`,
  );
  protected readonly lines = computed(() =>
    makeLines(this.variant(), this.count()),
  );
}
