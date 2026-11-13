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

const root = "relative inline-flex overflow-hidden";
const letter = "relative inline-block whitespace-pre";
const copies = {
  up: "absolute inset-x-0 top-full",
  down: "absolute inset-x-0 bottom-full",
};

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
const TRIGGER = "a, button, label, [tabindex]";
const EVENTS = ["pointerenter", "focusin", "pointerleave", "focusout"];

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Stagger rank of each letter. Random mode uses a fixed shuffled order (hash), the same on every render. */
function ranks(count: number, random: boolean) {
  const order = [...Array(count).keys()];
  const hash = (i: number) => Math.imul(i + 1, 2654435761) >>> 0;
  if (random) order.sort((a, b) => hash(a) - hash(b));
  const rank: number[] = [];
  order.forEach((index, position) => (rank[index] = position));
  return rank;
}

export type LetterSwapMode = "forward" | "pingpong" | "random";
export type LetterSwapDirection = keyof typeof copies;

type SwapOptions = {
  mode: LetterSwapMode;
  direction: LetterSwapDirection;
  stagger: number;
  duration: number;
};

/** Listens for hover and focus and swaps every letter. Returns a cleanup function. */
function startSwap(element: HTMLElement, options: SwapOptions) {
  const { mode, stagger, duration } = options;
  const target = element.closest<HTMLElement>(TRIGGER) ?? element;
  const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
  const rank = ranks(letters.length, mode === "random");
  const shift = `translateY(${options.direction === "up" ? "-100%" : "100%"})`;
  let busyUntil = 0;

  // Pingpong: a CSS transition back and forth. Forward and random: one pass, then an invisible reset.
  const move = (event: Event) => {
    const enter = EVENTS.indexOf(event.type) < 2;
    const now = performance.now();
    if (mode !== "pingpong") {
      if (!enter || now < busyUntil) return;
      busyUntil = now + duration + stagger * letters.length;
    }
    letters.forEach((el, i) => {
      const delay = rank[i]! * stagger;
      if (mode !== "pingpong") {
        el.animate?.([{ transform: "none" }, { transform: shift }], {
          duration,
          delay,
          easing: EASING,
        });
        return;
      }
      el.style.transition = `transform ${duration}ms ${EASING} ${delay}ms`;
      el.style.transform = enter ? shift : "";
    });
  };
  EVENTS.forEach((name) => target.addEventListener(name, move));
  return () => {
    EVENTS.forEach((name) => target.removeEventListener(name, move));
    letters.forEach((el) => {
      el.style.transition = "";
      el.style.transform = "";
    });
  };
}

/** Attribute selector on a span: class and other attributes stay on the root. */
@Component({
  selector: "span[markas-letter-swap]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ text() }}</span>
    @for (char of chars(); track $index) {
      <span aria-hidden="true" data-letter="" [class]="letter"
        >{{ char }}<span [class]="copyClass()">{{ char }}</span></span
      >
    }`,
})
export class LetterSwap {
  readonly text = input.required<string>();
  readonly mode = input<LetterSwapMode>("forward");
  readonly direction = input<LetterSwapDirection>("up");
  readonly stagger = input(30, { transform: numberAttribute });
  readonly duration = input(400, { transform: numberAttribute });

  protected readonly root = root;
  protected readonly letter = letter;
  protected readonly chars = computed(() => Array.from(this.text()));
  protected readonly copyClass = computed(() => copies[this.direction()]);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        mode: this.mode(),
        direction: this.direction(),
        stagger: this.stagger(),
        duration: this.duration(),
      };
      this.chars();
      if (reducedMotion()) return;
      onCleanup(startSwap(this.host.nativeElement, options));
    });
  }
}
