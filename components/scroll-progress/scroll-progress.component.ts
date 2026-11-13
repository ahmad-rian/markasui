import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from "@angular/core";

const root = "pointer-events-none z-50 w-full";
const bar = "h-full w-full origin-left";
const targets = {
  page: "fixed inset-x-0 top-0",
  parent: "sticky top-0 left-0",
};
const sizes = {
  sm: "h-0.5",
  md: "h-1",
  lg: "h-1.5",
};
const colors = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export type ScrollProgressTarget = keyof typeof targets;
export type ScrollProgressColor = keyof typeof colors;
export type ScrollProgressSize = keyof typeof sizes;

/**
 * Fills the bar with the scroll position of the page or the parent element. Updates are batched
 * per frame. Returns a cleanup function.
 */
function trackScroll(
  element: HTMLElement,
  fill: HTMLElement,
  target: ScrollProgressTarget,
) {
  const scroller = target === "parent" ? element.parentElement : null;
  const source = scroller ?? document.documentElement;
  const events: EventTarget = scroller ?? window;
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = source.scrollHeight - source.clientHeight;
    const progress =
      max > 0 ? Math.min(Math.max(source.scrollTop / max, 0), 1) : 0;
    fill.style.transform = `scaleX(${progress})`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  events.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    events.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

/** Attribute selector on the bar div, so target="parent" follows the element it sits in. */
@Component({
  selector: "div[markas-scroll-progress]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "aria-hidden": "true", "[class]": "classes()" },
  template: `<div
    #fillEl
    [class]="fillClasses()"
    style="transform: scaleX(0)"
  ></div>`,
})
export class ScrollProgress {
  /** Follow the whole page, or the closest scrolling parent element. */
  readonly target = input<ScrollProgressTarget>("page");
  readonly color = input<ScrollProgressColor>("primary");
  readonly size = input<ScrollProgressSize>("sm");

  protected readonly classes = computed(
    () => `${root} ${targets[this.target()]} ${sizes[this.size()]}`,
  );
  protected readonly fillClasses = computed(
    () => `${bar} ${colors[this.color()]}`,
  );
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly fill = viewChild.required<ElementRef<HTMLElement>>("fillEl");

  constructor() {
    afterRenderEffect((onCleanup) => {
      const target = this.target();
      onCleanup(
        trackScroll(this.host.nativeElement, this.fill().nativeElement, target),
      );
    });
  }
}
