import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0 overflow-hidden";
const wash =
  "absolute -inset-1/4 animate-[markas-noise-drift_var(--markas-noise-speed)_ease-in-out_infinite_alternate] bg-[radial-gradient(36%_42%_at_30%_35%,color-mix(in_oklab,currentColor_26%,transparent),transparent),radial-gradient(40%_40%_at_70%_65%,color-mix(in_oklab,currentColor_16%,transparent),transparent)] motion-reduce:animate-none";
const grain =
  "absolute inset-0 bg-ink opacity-[var(--markas-noise-alpha)] [mask-size:var(--markas-noise-size)]";
const vignette =
  "absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,currentColor)] text-ink/20 dark:text-canvas/85";
const content = "relative";
const textures = {
  grain:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 -4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  paper:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.5 .12' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 4 -1.7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
};
const variants = {
  grain: textures.grain,
  film: textures.grain,
  paper: textures.paper,
};
const colors = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  muted: "text-muted",
};
const intensities = {
  low: "[--markas-noise-alpha:0.05]",
  medium: "[--markas-noise-alpha:0.09]",
  high: "[--markas-noise-alpha:0.15]",
};
const sizes = {
  fine: "[--markas-noise-size:120px]",
  medium: "[--markas-noise-size:200px]",
  coarse: "[--markas-noise-size:320px]",
};
const speeds = {
  slow: "[--markas-noise-speed:30s]",
  normal: "[--markas-noise-speed:18s]",
  fast: "[--markas-noise-speed:10s]",
};
const keyframes =
  "@keyframes markas-noise-drift{to{transform:translate(-6%,4%) rotate(4deg) scale(1.08)}}";

/** grain: fine grain; film: stronger grain with a vignette; paper: soft paper fibers. */
export type NoiseBackgroundVariant = keyof typeof variants;
export type NoiseBackgroundColor = keyof typeof colors;
export type NoiseBackgroundIntensity = keyof typeof intensities;
export type NoiseBackgroundSize = keyof typeof sizes;
export type NoiseBackgroundSpeed = keyof typeof speeds;

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-noise-background]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      <div [class]="wash"></div>
      <div [class]="grain" [style.mask-image]="texture()"></div>
      @if (variant() === "film") {
        <div [class]="vignette"></div>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class NoiseBackground {
  readonly variant = input<NoiseBackgroundVariant>("grain");
  readonly color = input<NoiseBackgroundColor>("primary");
  readonly intensity = input<NoiseBackgroundIntensity>("medium");
  /** Size of one grain tile: smaller is finer. */
  readonly size = input<NoiseBackgroundSize>("medium");
  readonly speed = input<NoiseBackgroundSpeed>("normal");

  protected readonly base = base;
  protected readonly wash = wash;
  protected readonly grain = grain;
  protected readonly vignette = vignette;
  protected readonly content = content;
  protected readonly texture = computed(
    () => variants[this.variant()] ?? variants.grain,
  );
  protected readonly layerClasses = computed(() =>
    [
      layer,
      colors[this.color()],
      intensities[this.intensity()],
      sizes[this.size()],
      speeds[this.speed()],
    ].join(" "),
  );
}
