import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
} from "@angular/core";

const root = "relative inline-flex overflow-hidden align-bottom";
const unit = "inline-block whitespace-pre";

const EASE_IN = "cubic-bezier(0.55, 0, 1, 0.45)";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

export type TextRotateSplit = "chars" | "words";
export type TextRotateFrom = "first" | "last" | "center" | "random";

/** Splits a phrase into letters, or into words with the space after them. */
const splitText = (text: string, split: TextRotateSplit) =>
  split === "chars" ? Array.from(text) : text.split(/(?<= )/);

/** Stagger rank of each unit from the starting point. Random uses a fixed shuffled order (hash). */
function ranks(count: number, from: TextRotateFrom) {
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

const unitsOf = (host: HTMLElement) => [
  ...host.querySelectorAll<HTMLElement>("[data-unit]"),
];

type RotateOptions = {
  count: number;
  from: TextRotateFrom;
  interval: number;
  stagger: number;
  duration: number;
  pauseOnHover: boolean;
};

/**
 * The old word leaves upward unit by unit, then `advance` renders the next one. Paused on
 * hover, off screen, or in a hidden tab. Returns a stop function.
 */
function startRotation(
  host: HTMLElement,
  options: RotateOptions,
  advance: (width: number) => void,
) {
  let hovered = false;
  let busy = false;
  let timer: ReturnType<typeof setInterval> | undefined;
  const next = () => {
    if (busy || (hovered && options.pauseOnHover) || document.hidden) return;
    busy = true;
    const list = unitsOf(host);
    const rank = ranks(list.length, options.from);
    const exits = list.map((el, i) =>
      el.animate?.(
        [
          { transform: "none", opacity: 1 },
          { transform: "translateY(-100%)", opacity: 0 },
        ],
        {
          duration: options.duration,
          delay: rank[i]! * options.stagger,
          easing: EASE_IN,
          fill: "forwards",
        },
      ),
    );
    Promise.all(exits.map((animation) => animation?.finished))
      .then(() => advance(host.offsetWidth))
      .catch(() => {})
      .finally(() => (busy = false));
  };
  const onEnter = () => (hovered = true);
  const onLeave = () => (hovered = false);
  host.addEventListener("pointerenter", onEnter);
  host.addEventListener("pointerleave", onLeave);
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          clearInterval(timer);
          if (entries.some((entry) => entry.isIntersecting))
            timer = setInterval(next, options.interval);
        });
  if (observer) observer.observe(host);
  else timer = setInterval(next, options.interval);
  return () => {
    observer?.disconnect();
    clearInterval(timer);
    host.removeEventListener("pointerenter", onEnter);
    host.removeEventListener("pointerleave", onLeave);
  };
}

/** The new word rises in unit by unit, and the width of the wrapper follows smoothly. */
function enter(
  host: HTMLElement,
  width: number,
  options: Pick<RotateOptions, "from" | "stagger" | "duration">,
) {
  const list = unitsOf(host);
  const rank = ranks(list.length, options.from);
  list.forEach((el, i) =>
    el.animate?.(
      [
        { transform: "translateY(100%)", opacity: 0 },
        { transform: "none", opacity: 1 },
      ],
      {
        duration: options.duration,
        delay: rank[i]! * options.stagger,
        easing: EASE_OUT,
        fill: "backwards",
      },
    ),
  );
  host.animate?.(
    [{ width: `${width}px` }, { width: `${host.offsetWidth}px` }],
    { duration: options.duration, easing: EASE_OUT },
  );
}

/** Attribute selector on a span, so the user's class and aria-* stay on the root. */
@Component({
  selector: "span[markas-text-rotate]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ label() }}</span>
    @for (part of parts(); track part.key) {
      <span aria-hidden="true" data-unit="" [class]="unit">{{
        part.text
      }}</span>
    }`,
})
export class TextRotate {
  readonly words = input.required<string[]>();
  readonly split = input<TextRotateSplit>("chars");
  readonly from = input<TextRotateFrom>("first");
  readonly interval = input(2500, { transform: numberAttribute });
  readonly stagger = input(25, { transform: numberAttribute });
  readonly duration = input(400, { transform: numberAttribute });
  readonly pauseOnHover = input(true, { transform: booleanAttribute });

  protected readonly root = root;
  protected readonly unit = unit;
  protected readonly label = computed(() => this.words().join(", "));
  /** Index of the word on screen. It goes back to the first word when the words change. */
  private readonly index = linkedSignal({
    source: this.words,
    computation: () => 0,
  });
  /** Width before the last swap, so the enter step can animate from it. Undefined when no swap is pending. */
  private pendingWidth: number | undefined;
  // Modulo keeps the index valid when the list of words changes.
  protected readonly parts = computed(() => {
    const words = this.words();
    const index = this.index();
    const current = words[index % Math.max(words.length, 1)] ?? "";
    return splitText(current, this.split()).map((text, i) => ({
      key: `${index}-${i}`,
      text,
    }));
  });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect(() => {
      this.parts();
      const width = this.pendingWidth;
      if (width === undefined) return;
      this.pendingWidth = undefined;
      enter(this.host.nativeElement, width, {
        from: this.from(),
        stagger: this.stagger(),
        duration: this.duration(),
      });
    });
    afterRenderEffect((onCleanup) => {
      const options = {
        count: this.words().length,
        from: this.from(),
        interval: this.interval(),
        stagger: this.stagger(),
        duration: this.duration(),
        pauseOnHover: this.pauseOnHover(),
      };
      this.split();
      if (options.count < 2 || reducedMotion()) return;
      onCleanup(
        startRotation(this.host.nativeElement, options, (width) => {
          this.pendingWidth = width;
          this.index.update((current) => (current + 1) % options.count);
        }),
      );
    });
  }
}
