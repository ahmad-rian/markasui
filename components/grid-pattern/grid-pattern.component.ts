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
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:var(--markas-grid-size)_var(--markas-grid-size)]";
const cell =
  "absolute bg-current animate-[markas-grid-cell_4s_ease-in-out_infinite] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/20",
  primary: "text-primary/15",
  success: "text-success/30",
  warning: "text-warning/30",
  danger: "text-danger/30",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};
const keyframes = "@keyframes markas-grid-cell{50%{opacity:.4}}";
const CELL_DELAY_MS = 800;

export type GridPatternColor = keyof typeof colors;
export type GridPatternMask = keyof typeof masks;

/** Posisi satu sel sorotan di dalam garis grid (kolom, baris mulai dari 0). */
const cellStyle = ([col, row]: [number, number], size: number, index: number) =>
  `left:${col * size + 1}px;top:${row * size + 1}px;width:${size - 1}px;height:${size - 1}px;animation-delay:${index * CELL_DELAY_MS}ms`;

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-grid-pattern]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "base",
    "[style.--markas-grid-size]": "cellSize() + 'px'",
  },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      @for (item of highlights(); track item.key) {
        <span [class]="cell" [style]="item.style"></span>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class GridPattern {
  readonly cellSize = input(32, { transform: numberAttribute });
  /** Highlighted cells as [column, row], counted from 0. */
  readonly cells = input<[number, number][]>([]);
  readonly color = input<GridPatternColor>("muted");
  readonly mask = input<GridPatternMask>("none");

  protected readonly base = base;
  protected readonly cell = cell;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]} ${masks[this.mask()]}`,
  );
  protected readonly highlights = computed(() =>
    this.cells().map((position, index) => ({
      key: position.join("-"),
      style: cellStyle(position, this.cellSize(), index),
    })),
  );
}
