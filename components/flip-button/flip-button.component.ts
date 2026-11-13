import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  viewChild,
} from "@angular/core";

const base =
  "group inline-grid font-medium whitespace-nowrap perspective-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";
const sizes = {
  sm: "h-8 rounded-md text-sm",
  md: "h-10 rounded-lg text-sm",
  lg: "h-12 rounded-lg text-base",
};
const inner =
  "grid rounded-[inherit] transition-transform duration-500 ease-out transform-3d group-hover:rotate-x-180 group-focus-visible:rotate-x-180 motion-reduce:transition-none";
const face =
  "col-start-1 row-start-1 inline-flex items-center justify-center gap-2 rounded-[inherit] backface-hidden";
const facePadding = {
  sm: "px-3",
  md: "px-4",
  lg: "px-6",
};
const variants = {
  primary: "bg-primary text-on-primary",
  secondary: "border border-line bg-surface text-ink",
  ghost: "text-ink",
  danger: "bg-danger text-on-primary",
};
const backVariants = {
  primary: "rotate-x-180 bg-primary-strong text-on-primary",
  secondary: "rotate-x-180 border border-primary-line bg-primary-soft text-ink",
  ghost: "rotate-x-180 bg-subtle text-ink",
  danger: "rotate-x-180 bg-danger text-on-primary",
};

export type FlipButtonVariant = keyof typeof variants;
export type FlipButtonSize = keyof typeof sizes;

/**
 * Attribute selector on the native button. Back face: an element with the `back` attribute
 * (an ng-container works) wins, then backLabel, then a copy of the main label.
 */
@Component({
  selector: "button[markas-flip-button]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[attr.type]": "type()", "[class]": "classes()" },
  template: `
    <span [class]="inner">
      <span #front [class]="frontClasses()"><ng-content /></span>
      <span #back [class]="backClasses()" aria-hidden="true">
        <ng-content select="[back]">{{ backLabel() }}</ng-content>
      </span>
    </span>
  `,
})
export class FlipButton {
  readonly variant = input<FlipButtonVariant>("primary");
  readonly size = input<FlipButtonSize>("md");
  /** Text on the back face, shown on hover and focus. The back slot wins, the label is the fallback. */
  readonly backLabel = input("");
  readonly type = input<"button" | "submit" | "reset">("button");

  protected readonly inner = inner;
  protected readonly classes = computed(() => `${base} ${sizes[this.size()]}`);
  protected readonly frontClasses = computed(
    () => `${face} ${facePadding[this.size()]} ${variants[this.variant()]}`,
  );
  protected readonly backClasses = computed(
    () => `${face} ${facePadding[this.size()]} ${backVariants[this.variant()]}`,
  );
  private readonly front = viewChild.required<ElementRef<HTMLElement>>("front");
  private readonly back = viewChild.required<ElementRef<HTMLElement>>("back");

  constructor() {
    // ng-content projects once, so an empty back face gets a copy of the main label.
    afterNextRender(() => {
      const back = this.back().nativeElement;
      if (back.childElementCount > 0 || back.textContent?.trim()) return;
      back.replaceChildren(
        ...[...this.front().nativeElement.childNodes].map((node) =>
          node.cloneNode(true),
        ),
      );
    });
  }
}
