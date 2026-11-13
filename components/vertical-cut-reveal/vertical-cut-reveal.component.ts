import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from "@angular/core";

const root = "block";
const line = "block";
const lineCut = "block overflow-hidden pb-[0.12em] -mb-[0.12em]";
const cut = "inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em]";
const unit = "inline-block whitespace-pre";
const lineUnit = "block";

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const offsets = { up: "translateY(120%)", down: "translateY(-120%)" };

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export type VerticalCutRevealSplit = "chars" | "words" | "lines";
export type VerticalCutRevealDirection = keyof typeof offsets;
export type VerticalCutRevealFrom = "first" | "last" | "center" | "random";

/** Stagger rank of each unit from the starting point. Random uses a fixed shuffled order (hash). */
function ranks(count: number, from: VerticalCutRevealFrom) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (from === "random") order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => {
    const middle = Math.abs(index - (count - 1) / 2);
    rank[index] =
      from === "last"
        ? count - 1 - index
        : from === "center"
          ? middle
          : position;
  });
  return rank;
}

type RevealOptions = {
  direction: VerticalCutRevealDirection;
  from: VerticalCutRevealFrom;
  stagger: number;
  duration: number;
  delay: number;
};

/** Hide every unit behind the cut line, then reveal them in turn once the text scrolls into view. */
function startReveal(element: HTMLElement, options: RevealOptions) {
  const units = [...element.querySelectorAll<HTMLElement>("[data-unit]")];
  const rank = ranks(units.length, options.from);
  const offset = offsets[options.direction];
  units.forEach((el) => (el.style.transform = offset));
  const reveal = () =>
    units.forEach((el, i) => {
      el.animate?.([{ transform: offset }, { transform: "none" }], {
        duration: options.duration,
        delay: options.delay + rank[i]! * options.stagger,
        easing: EASING,
        fill: "backwards",
      });
      el.style.transform = "";
    });
  if (typeof IntersectionObserver === "undefined") {
    reveal();
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    reveal();
  });
  observer.observe(element);
  return () => {
    observer.disconnect();
    units.forEach((el) => (el.style.transform = ""));
  };
}

/** Attribute selector on a span, so the user's class and aria-* stay on the root. */
@Component({
  selector: "span[markas-vertical-cut-reveal]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ label() }}</span
    ><span aria-hidden="true">
      @for (lineText of lines(); track $index) {
        @if (split() === "lines") {
          <span [class]="lineCut"
            ><span data-unit="" [class]="lineUnit">{{ lineText }}</span></span
          >
        } @else {
          <span [class]="line">
            @for (word of lineText.split(" "); track $index; let w = $index) {
              @if (w > 0) {
                &ngsp;
              }
              <span [class]="cut">
                @if (split() === "words") {
                  <span data-unit="" [class]="unit">{{ word }}</span>
                } @else {
                  @for (char of chars(word); track $index) {
                    <span data-unit="" [class]="unit">{{ char }}</span>
                  }
                }
              </span>
            }
          </span>
        }
      }
    </span>`,
})
export class VerticalCutReveal {
  /** A line break (\n) splits the text into several lines. */
  readonly text = input.required<string>();
  readonly split = input<VerticalCutRevealSplit>("words");
  readonly direction = input<VerticalCutRevealDirection>("up");
  readonly from = input<VerticalCutRevealFrom>("first");
  readonly stagger = input(60, { transform: numberAttribute });
  readonly duration = input(700, { transform: numberAttribute });
  readonly delay = input(0, { transform: numberAttribute });

  protected readonly root = root;
  protected readonly line = line;
  protected readonly lineCut = lineCut;
  protected readonly cut = cut;
  protected readonly unit = unit;
  protected readonly lineUnit = lineUnit;
  protected readonly lines = computed(() => this.text().split("\n"));
  protected readonly label = computed(() => this.lines().join(" "));
  protected readonly chars = (word: string) => Array.from(word);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        direction: this.direction(),
        from: this.from(),
        stagger: this.stagger(),
        duration: this.duration(),
        delay: this.delay(),
      };
      this.lines();
      this.split();
      if (reducedMotion()) return;
      onCleanup(startReveal(this.host.nativeElement, options));
    });
  }
}
