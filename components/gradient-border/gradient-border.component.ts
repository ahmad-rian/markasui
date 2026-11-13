import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate bg-line p-px";
const layer =
  "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] [container-type:size]";
const glowLayer = "-z-10 opacity-50 blur-lg";
const inner = "relative h-full bg-surface";
const variants = {
  spin: "absolute top-1/2 left-1/2 size-[calc(100cqw+100cqh)] -translate-x-1/2 -translate-y-1/2 animate-[markas-gb-spin_var(--markas-gb-duration)_linear_infinite] bg-[conic-gradient(transparent_0deg,currentColor_60deg,transparent_120deg,transparent_180deg,currentColor_240deg,transparent_300deg)] motion-reduce:animate-none",
  shine:
    "absolute inset-y-0 left-0 w-1/3 translate-x-full -skew-x-12 animate-[markas-gb-shine_var(--markas-gb-duration)_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,currentColor,transparent)] motion-reduce:animate-none",
  pulse:
    "absolute inset-0 animate-[markas-gb-pulse_var(--markas-gb-duration)_ease-in-out_infinite] bg-[conic-gradient(from_180deg,currentColor,transparent_30%,currentColor_50%,transparent_80%,currentColor)] motion-reduce:animate-none",
};
const radii = {
  lg: { outer: "rounded-lg", inner: "rounded-[7px]" },
  xl: { outer: "rounded-xl", inner: "rounded-[11px]" },
  full: { outer: "rounded-full", inner: "rounded-full" },
};
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const speeds = { slow: "8s", normal: "4s", fast: "2s" };
const keyframes =
  "@keyframes markas-gb-spin{to{rotate:360deg}}@keyframes markas-gb-shine{0%{translate:-100% 0}60%,100%{translate:400% 0}}@keyframes markas-gb-pulse{50%{opacity:.2}}";

export type GradientBorderVariant = keyof typeof variants;
export type GradientBorderColor = keyof typeof colors;
export type GradientBorderSpeed = keyof typeof speeds;
export type GradientBorderRadius = keyof typeof radii;

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-gradient-border]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: {
    "[class]": "classes()",
    "[style.--markas-gb-duration]": "duration()",
  },
  template: `
    @if (glow()) {
      <div aria-hidden="true" [class]="glowClasses()">
        <span [class]="sweep()"></span>
      </div>
    }
    <div aria-hidden="true" [class]="layerClasses()">
      <span [class]="sweep()"></span>
    </div>
    <div [class]="innerClasses()"><ng-content /></div>
  `,
})
export class GradientBorder {
  readonly variant = input<GradientBorderVariant>("spin");
  readonly color = input<GradientBorderColor>("primary");
  readonly speed = input<GradientBorderSpeed>("normal");
  readonly radius = input<GradientBorderRadius>("xl");
  readonly glow = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(
    () => `${base} ${radii[this.radius()].outer}`,
  );
  protected readonly duration = computed(() => speeds[this.speed()]);
  protected readonly sweep = computed(() => variants[this.variant()]);
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]}`,
  );
  protected readonly glowClasses = computed(
    () => `${layer} ${glowLayer} ${colors[this.color()]}`,
  );
  protected readonly innerClasses = computed(
    () => `${inner} ${radii[this.radius()].inner}`,
  );
}
