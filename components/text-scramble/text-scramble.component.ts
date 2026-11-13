import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  linkedSignal,
  numberAttribute,
} from "@angular/core";

const root = "inline-grid tabular-nums";
const layer = "col-start-1 row-start-1";
const holder = "invisible col-start-1 row-start-1";

const charsets = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@$%&*+=<>/?{}[]",
  binary: "01",
};

/** Random letters change at most every 50 ms, so it reads as an effect, not a flicker. */
const FRAME = 50;
/** Hover and focus are heard on the closest interactive element (link, button), or on the text itself. */
const TRIGGER = "a, button, label, [tabindex]";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Deterministic random (Park-Miller): the same scrambled letters on every run and in every framework. */
function scrambler(text: string, charset: string) {
  const chars = Array.from(text);
  let seed = 1;
  const pick = () => {
    seed = (seed * 48271) % 2147483647;
    return charset[seed % charset.length];
  };
  return (revealed: number) =>
    chars
      .map((char, i) => (i < revealed || char.trim() === "" ? char : pick()))
      .join("");
}

export type TextScrambleTrigger = "hover" | "view" | "mount";
export type TextScrambleCharset = keyof typeof charsets;

type ScrambleOptions = {
  text: string;
  trigger: TextScrambleTrigger;
  charset: TextScrambleCharset;
  duration: number;
  delay: number;
};

/** Wires the trigger and runs the scramble, writing each frame through `write`. Returns a stop function. */
function startScramble(
  element: HTMLElement,
  options: ScrambleOptions,
  write: (text: string) => void,
) {
  const set = charsets[options.charset];
  const total = Array.from(options.text).length;
  let frame = 0;
  write(options.text);
  let observer: IntersectionObserver | undefined;

  // Scramble every letter, then reveal from left to right until the real text is whole again.
  const run = (wait: number) => {
    if (frame) return;
    const scramble = scrambler(options.text, set);
    let began: number | undefined;
    let last = -FRAME;
    const tick = (now: number) => {
      began ??= now;
      const progress = Math.min((now - began - wait) / options.duration, 1);
      if (now - last >= FRAME || progress >= 1) {
        last = now;
        write(scramble(Math.max(Math.floor(progress * total), 0)));
      }
      frame = progress < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
  };

  const target = element.closest<HTMLElement>(TRIGGER) ?? element;
  const hover = () => run(0);
  if (options.trigger === "hover") {
    target.addEventListener("pointerenter", hover);
    target.addEventListener("focusin", hover);
  } else {
    write(scrambler(options.text, set)(0));
    if (
      options.trigger === "mount" ||
      typeof IntersectionObserver === "undefined"
    )
      run(options.delay);
    else {
      // Scrambled while off screen, then decoded once when it scrolls into view.
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        run(options.delay);
      });
      observer.observe(element);
    }
  }
  return () => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    target.removeEventListener("pointerenter", hover);
    target.removeEventListener("focusin", hover);
  };
}

/** Attribute selector on a span, so the user's class and aria-* stay on the root. */
@Component({
  selector: "span[markas-text-scramble]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ text() }}</span
    ><span aria-hidden="true" [class]="holder">{{ text() }}</span
    ><span aria-hidden="true" [class]="layer">{{ display() }}</span>`,
})
export class TextScramble {
  readonly text = input.required<string>();
  readonly trigger = input<TextScrambleTrigger>("hover");
  readonly charset = input<TextScrambleCharset>("letters");
  readonly duration = input(800, { transform: numberAttribute });
  readonly delay = input(0, { transform: numberAttribute });

  protected readonly root = root;
  protected readonly layer = layer;
  protected readonly holder = holder;
  /** The visible text. It goes back to the real text when the text changes. */
  protected readonly display = linkedSignal(() => this.text());
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        text: this.text(),
        trigger: this.trigger(),
        charset: this.charset(),
        duration: this.duration(),
        delay: this.delay(),
      };
      if (reducedMotion()) return;
      onCleanup(
        startScramble(this.host.nativeElement, options, (value) =>
          this.display.set(value),
        ),
      );
    });
  }
}
