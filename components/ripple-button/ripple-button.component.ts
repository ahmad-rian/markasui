import {
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  viewChild,
} from "@angular/core";

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};
const layer = "pointer-events-none absolute inset-0 -z-10";
const wave = "absolute rounded-full bg-current opacity-0";

const WAVE = [
  { scale: "0", opacity: 0.25 },
  { scale: "1", opacity: 0 },
];
const WAVE_DURATION = 600;

const reducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type RippleButtonVariant = keyof typeof variants;
export type RippleButtonSize = keyof typeof sizes;

/**
 * Attribute selector on the native button: disabled, aria-*, name, value, and the user's
 * class stay on the button itself. Each click adds one wave.
 */
@Component({
  selector: "button[markas-ripple-button]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.type]": "type()",
    "[class]": "classes()",
    "(click)": "ripple($event)",
  },
  template: `<span #wave [class]="layer" aria-hidden="true"></span
    ><ng-content />`,
})
export class RippleButton {
  readonly variant = input<RippleButtonVariant>("primary");
  readonly size = input<RippleButtonSize>("md");
  readonly type = input<"button" | "submit" | "reset">("button");

  protected readonly layer = layer;
  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]} ${sizes[this.size()]}`,
  );
  private readonly layerRef =
    viewChild.required<ElementRef<HTMLSpanElement>>("wave");

  /** Adds one wave to the layer, from the pointer or from the center for keyboard clicks. */
  protected ripple(event: MouseEvent) {
    const target = this.layerRef().nativeElement;
    const button = target.parentElement;
    if (!button || reducedMotion()) return;
    const rect = button.getBoundingClientRect();
    const fromPointer = event.detail > 0;
    const x = fromPointer ? event.clientX - rect.left : rect.width / 2;
    const y = fromPointer ? event.clientY - rect.top : rect.height / 2;
    const diameter = Math.hypot(rect.width, rect.height) * 2;
    const element = document.createElement("span");
    element.className = wave;
    element.style.cssText = `left:${x - diameter / 2}px;top:${y - diameter / 2}px;width:${diameter}px;height:${diameter}px`;
    target.append(element);
    if (typeof element.animate !== "function") return element.remove();
    element.animate(WAVE, {
      duration: WAVE_DURATION,
      easing: "ease-out",
    }).onfinish = () => element.remove();
  }
}
