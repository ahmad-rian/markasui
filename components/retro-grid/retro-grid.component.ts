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
  "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px] [mask-image:linear-gradient(to_bottom,transparent_15%,black_60%)]";
const plane = "absolute inset-0 [transform:rotateX(var(--markas-retro-angle))]";
const grid =
  "absolute -top-full -left-[150%] h-[400%] w-[400%] animate-[markas-retro-grid_1s_linear_infinite] bg-[linear-gradient(to_right,currentColor_1px,transparent_0),linear-gradient(to_bottom,currentColor_1px,transparent_0)] [background-size:var(--markas-retro-cell)_var(--markas-retro-cell)] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted/40",
  primary: "text-primary/30",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const keyframes =
  "@keyframes markas-retro-grid{from{transform:translateY(calc(var(--markas-retro-cell)*-1))}to{transform:translateY(0)}}";

export type RetroGridColor = keyof typeof colors;

/**
 * Attribute selector on the native root div: the user's class, style, and attributes stay
 * on it. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-retro-grid]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "base",
    "[style.--markas-retro-cell]": "cellSize() + 'px'",
    "[style.--markas-retro-angle]": "angle() + 'deg'",
  },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      <div [class]="plane"><div [class]="grid"></div></div>
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class RetroGrid {
  readonly cellSize = input(60, { transform: numberAttribute });
  readonly angle = input(65, { transform: numberAttribute });
  readonly color = input<RetroGridColor>("muted");

  protected readonly base = base;
  protected readonly plane = plane;
  protected readonly grid = grid;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]}`,
  );
}
