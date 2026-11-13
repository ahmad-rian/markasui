import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  linkedSignal,
  untracked,
} from "@angular/core";

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Exponential ease-out: fast at first, slowing down near the final number. */
const easeOut = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/** Calls `callback` once, the first time the element is visible. Returns a cleanup function. */
function whenVisible(element: Element, callback: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    callback();
  });
  observer.observe(element);
  return () => observer.disconnect();
}

/** Attribute selector on a span: class and other attributes stay on the root. */
@Component({
  selector: "span[markas-number-ticker]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ text(value()) }}</span
    ><span aria-hidden="true" [class]="holder">{{ text(value()) }}</span
    ><span aria-hidden="true" [class]="layer">{{ text(display()) }}</span>`,
})
export class NumberTicker {
  readonly value = input.required({ transform: numberAttribute });
  readonly from = input(0, { transform: numberAttribute });
  /** Milliseconds from the start number to value. */
  readonly duration = input(2000, { transform: numberAttribute });
  readonly decimals = input(0, { transform: numberAttribute });
  readonly locale = input("en-US");
  readonly prefix = input("");
  readonly suffix = input("");

  protected readonly root = root;
  protected readonly layer = layer;
  protected readonly holder = holder;
  // Starts at the final value, like the server render of the other versions.
  protected readonly display = linkedSignal(() => this.value());
  private readonly formatter = computed(
    () =>
      new Intl.NumberFormat(this.locale(), {
        minimumFractionDigits: this.decimals(),
        maximumFractionDigits: this.decimals(),
      }),
  );
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  /** The number the animation last reached; the next run starts from here. */
  private current: number | undefined;

  constructor() {
    afterRenderEffect((onCleanup) => {
      const target = this.value();
      const duration = this.duration();
      this.current ??= untracked(this.from);
      if (reducedMotion()) {
        this.current = target;
        this.display.set(target);
        return;
      }
      const start = this.current;
      let frame = 0;
      this.display.set(start);
      const stop = whenVisible(this.host.nativeElement, () => {
        let began: number | undefined;
        const tick = (now: number) => {
          began ??= now;
          const progress = Math.min((now - began) / duration, 1);
          this.current = start + (target - start) * easeOut(progress);
          this.display.set(this.current);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      });
      onCleanup(() => {
        stop();
        cancelAnimationFrame(frame);
      });
    });
  }

  protected text(n: number) {
    return `${this.prefix()}${this.formatter().format(n)}${this.suffix()}`;
  }
}
