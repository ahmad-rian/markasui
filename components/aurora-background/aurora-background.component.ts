import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";

const base = "relative isolate overflow-hidden";
const layer = "pointer-events-none absolute inset-0 overflow-hidden";
const glowA =
  "absolute -inset-1/2 animate-[markas-aurora-a_var(--markas-aurora-speed)_ease-in-out_infinite_alternate] bg-[radial-gradient(30%_34%_at_36%_44%,color-mix(in_oklab,var(--markas-aurora-color)_42%,transparent),transparent),radial-gradient(22%_26%_at_64%_36%,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent)] motion-reduce:animate-none";
const glowB =
  "absolute -inset-1/2 animate-[markas-aurora-b_var(--markas-aurora-speed)_ease-in-out_infinite_alternate] bg-[radial-gradient(26%_22%_at_58%_62%,color-mix(in_oklab,var(--markas-aurora-color)_30%,transparent),transparent),radial-gradient(18%_22%_at_40%_60%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent)] motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "[--markas-aurora-color:var(--color-muted)]",
  primary: "[--markas-aurora-color:var(--color-primary)]",
  success: "[--markas-aurora-color:var(--color-success)]",
  warning: "[--markas-aurora-color:var(--color-warning)]",
  danger: "[--markas-aurora-color:var(--color-danger)]",
};
const speeds = {
  slow: "[--markas-aurora-speed:24s]",
  normal: "[--markas-aurora-speed:14s]",
  fast: "[--markas-aurora-speed:8s]",
};
const keyframes =
  "@keyframes markas-aurora-a{50%{transform:translate(6%,-4%) rotate(10deg) scale(1.1)}to{transform:translate(-5%,5%) rotate(-8deg)}}@keyframes markas-aurora-b{50%{transform:translate(-7%,3%) rotate(-12deg) scale(1.15)}to{transform:translate(4%,-6%) rotate(9deg)}}";

export type AuroraBackgroundColor = keyof typeof colors;
export type AuroraBackgroundSpeed = keyof typeof speeds;

/**
 * Attribute selector on a native div: the user's class, style, and attributes stay on the
 * root. The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-aurora-background]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      <div [class]="glowA"></div>
      <div [class]="glowB"></div>
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class AuroraBackground {
  readonly color = input<AuroraBackgroundColor>("success");
  readonly speed = input<AuroraBackgroundSpeed>("normal");

  protected readonly base = base;
  protected readonly glowA = glowA;
  protected readonly glowB = glowB;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]} ${speeds[this.speed()]}`,
  );
}
