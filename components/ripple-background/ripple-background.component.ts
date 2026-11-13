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
  "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_80%)]";
const ring =
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[markas-ripple_3.4s_ease-in-out_infinite] rounded-full border border-current bg-current/5 motion-reduce:animate-none";
const content = "relative";
const colors = {
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const keyframes =
  "@keyframes markas-ripple{0%,100%{transform:scale(1)}50%{transform:scale(.92)}}";
const RING_DELAY_MS = 120;
const MAX_RINGS = 12;

export type RippleBackgroundColor = keyof typeof colors;

/** Ring i: the further out, the larger and fainter, with a delay so the pulse travels from the center. */
function makeRings(rings: number, size: number, gap: number) {
  const total = Math.max(0, Math.min(Math.trunc(rings), MAX_RINGS));
  return Array.from({ length: total }, (_, index) => {
    const diameter = size + index * gap;
    const opacity = Math.max(1, 6 - index) / 10;
    return `width: ${diameter}px; height: ${diameter}px; opacity: ${opacity}; animation-delay: ${index * RING_DELAY_MS}ms`;
  });
}

/**
 * Attribute selector on the native root div: the user's class and attributes stay on it.
 * The keyframes are a global style, so encapsulation is off.
 */
@Component({
  selector: "div[markas-ripple-background]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [keyframes],
  host: { "[class]": "base" },
  template: `
    <div aria-hidden="true" [class]="layerClasses()">
      @for (style of items(); track $index) {
        <span [class]="ring" [style]="style"></span>
      }
    </div>
    <div [class]="content"><ng-content /></div>
  `,
})
export class RippleBackground {
  readonly rings = input(6, { transform: numberAttribute });
  readonly size = input(120, { transform: numberAttribute });
  readonly gap = input(64, { transform: numberAttribute });
  readonly color = input<RippleBackgroundColor>("muted");

  protected readonly base = base;
  protected readonly ring = ring;
  protected readonly content = content;
  protected readonly layerClasses = computed(
    () => `${layer} ${colors[this.color()]}`,
  );
  protected readonly items = computed(() =>
    makeRings(this.rings(), this.size(), this.gap()),
  );
}
