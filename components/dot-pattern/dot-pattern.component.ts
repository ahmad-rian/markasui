import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,currentColor_var(--markas-dot-size),transparent_calc(var(--markas-dot-size)_+_0.5px))] [background-size:var(--markas-dot-spacing)_var(--markas-dot-spacing)]";
const content = "relative";
const colors = {
  muted: "text-muted/50",
  primary: "text-primary/40",
  success: "text-success/50",
  warning: "text-warning/50",
  danger: "text-danger/50",
};
const masks = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
  linear: "[mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]",
};

export type DotPatternColor = keyof typeof colors;
export type DotPatternMask = keyof typeof masks;

/** Attribute selector on a native div: the user's class, style, and attributes stay on the root. */
@Component({
  selector: "div[markas-dot-pattern]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "base",
    "[style.--markas-dot-spacing]": "spacing() + 'px'",
    "[style.--markas-dot-size]": "dotSize() + 'px'",
  },
  template: `
    <div aria-hidden="true" [class]="layerClasses()"></div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class DotPattern {
  readonly spacing = input(16, { transform: numberAttribute });
  readonly dotSize = input(1, { transform: numberAttribute });
  readonly color = input<DotPatternColor>("muted");
  readonly mask = input<DotPatternMask>("none");

  protected readonly base = base;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]} ${masks[this.mask()]}`,
  );
}
