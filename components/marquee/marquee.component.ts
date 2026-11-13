import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  viewChild,
} from "@angular/core";

const root = "flex overflow-hidden";
const copy = "flex shrink-0 justify-around gap-4";
const orientations = {
  horizontal: { root: "flex-row", copy: "min-w-full flex-row pr-4" },
  vertical: { root: "flex-col", copy: "min-h-full flex-col pb-4" },
};
const fades = {
  horizontal: "mask-x-from-85%",
  vertical: "mask-y-from-85%",
};
const MS_PER_SECOND = 1000;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

type MarqueeOptions = {
  vertical: boolean;
  reverse: boolean;
  duration: number;
  pauseOnHover: boolean;
};

/**
 * Moves every copy by its own size, forever. Pauses while hovered, while focus is inside,
 * or while the marquee is off screen. Returns a cleanup function.
 */
function startMarquee(element: HTMLElement, options: MarqueeOptions) {
  const axis = options.vertical ? "Y" : "X";
  const animations = Array.from(element.children).flatMap(
    (child) =>
      child.animate?.(
        [
          { transform: `translate${axis}(0)` },
          { transform: `translate${axis}(-100%)` },
        ],
        {
          duration: options.duration * MS_PER_SECOND,
          iterations: Infinity,
          direction: options.reverse ? "reverse" : "normal",
        },
      ) ?? [],
  );
  const state = { hover: false, focus: false, hidden: false };
  const sync = () => {
    const paused =
      (options.pauseOnHover && state.hover) || state.focus || state.hidden;
    for (const animation of animations)
      if (paused) animation.pause();
      else animation.play();
  };
  const listeners: [string, () => void][] = [
    ["mouseenter", () => ((state.hover = true), sync())],
    ["mouseleave", () => ((state.hover = false), sync())],
    ["focusin", () => ((state.focus = true), sync())],
    ["focusout", () => ((state.focus = false), sync())],
  ];
  for (const [type, listener] of listeners)
    element.addEventListener(type, listener);
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          state.hidden = !entries.some((entry) => entry.isIntersecting);
          sync();
        });
  observer?.observe(element);

  return () => {
    observer?.disconnect();
    for (const [type, listener] of listeners)
      element.removeEventListener(type, listener);
    for (const animation of animations) animation.cancel();
  };
}

/**
 * Attribute selector on the root div. ng-content projects once, so the hidden copy is a clone
 * of the visible one made after the first render.
 */
@Component({
  selector: "div[markas-marquee]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "classes()" },
  template: `
    <div #firstEl [class]="copyClasses()"><ng-content /></div>
    <div #cloneEl aria-hidden="true" inert [class]="copyClasses()"></div>
  `,
})
export class Marquee {
  readonly vertical = input(false, { transform: booleanAttribute });
  readonly reverse = input(false, { transform: booleanAttribute });
  /** Seconds for one full loop. */
  readonly duration = input(20, { transform: numberAttribute });
  readonly pauseOnHover = input(true, { transform: booleanAttribute });
  readonly fade = input(true, { transform: booleanAttribute });

  private readonly orientation = computed(() =>
    this.vertical() ? "vertical" : "horizontal",
  );
  protected readonly classes = computed(() =>
    [
      root,
      orientations[this.orientation()].root,
      this.fade() && fades[this.orientation()],
    ]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly copyClasses = computed(
    () => `${copy} ${orientations[this.orientation()].copy}`,
  );
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly first =
    viewChild.required<ElementRef<HTMLElement>>("firstEl");
  private readonly clone =
    viewChild.required<ElementRef<HTMLElement>>("cloneEl");

  constructor() {
    afterNextRender(() =>
      this.clone().nativeElement.replaceChildren(
        ...[...this.first().nativeElement.childNodes].map((node) =>
          node.cloneNode(true),
        ),
      ),
    );
    afterRenderEffect((onCleanup) => {
      const options = {
        vertical: this.vertical(),
        reverse: this.reverse(),
        duration: this.duration(),
        pauseOnHover: this.pauseOnHover(),
      };
      if (reducedMotion()) return;
      onCleanup(startMarquee(this.host.nativeElement, options));
    });
  }
}
