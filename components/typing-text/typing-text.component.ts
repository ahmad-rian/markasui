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
  viewChild,
} from "@angular/core";

const root = "inline";
const caret = "ml-0.5 inline-block h-[1.1em] w-0.5 bg-current align-[-0.2em]";

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Calls `callback(true/false)` whenever the element enters or leaves the screen. Returns a stop function. */
function onVisibility(element: Element, callback: (visible: boolean) => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback(true);
    return () => {};
  }
  const observer = new IntersectionObserver((entries) =>
    callback(entries.some((entry) => entry.isIntersecting)),
  );
  observer.observe(element);
  return () => observer.disconnect();
}

type TypingOptions = {
  words: string[];
  typeSpeed: number;
  deleteSpeed: number;
  pause: number;
  loop: boolean;
};

/** Type one letter, pause on the full word, delete it, then move to the next word. Returns a stop function. */
function startTyping(
  element: HTMLElement,
  caretElement: HTMLElement | undefined,
  options: TypingOptions,
  write: (text: string) => void,
) {
  const list = options.words.map((word) => Array.from(word));
  let index = 0;
  let count = list[0]?.length ?? 0;
  let deleting = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  // The caret blinks every 500 ms with the Web Animations API.
  const animation = caretElement?.animate?.([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    iterations: Infinity,
    easing: "steps(2, jump-none)",
  });

  const step = () => {
    const chars = list[index] ?? [];
    let delay = deleting ? options.deleteSpeed : options.typeSpeed;
    if (!deleting && count >= chars.length) {
      if (!options.loop && index === list.length - 1) return;
      deleting = true;
      delay = options.pause;
    } else if (deleting && count === 0) {
      deleting = false;
      index = (index + 1) % list.length;
    } else {
      count += deleting ? -1 : 1;
      write(chars.slice(0, count).join(""));
    }
    timer = setTimeout(step, delay);
  };

  const stop = onVisibility(element, (visible) => {
    clearTimeout(timer);
    if (visible) step();
  });
  return () => {
    stop();
    clearTimeout(timer);
    animation?.cancel();
  };
}

/** Attribute selector on a span, so the user's class and aria-* stay on the root. */
@Component({
  selector: "span[markas-typing-text]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ label() }}</span
    ><span aria-hidden="true">{{ typed() }}</span>
    @if (cursor()) {
      <span #caretEl aria-hidden="true" [class]="caret"></span>
    }`,
})
export class TypingText {
  readonly words = input.required<string[]>();
  readonly typeSpeed = input(70, { transform: numberAttribute });
  readonly deleteSpeed = input(40, { transform: numberAttribute });
  readonly pause = input(1800, { transform: numberAttribute });
  readonly loop = input(true, { transform: booleanAttribute });
  readonly cursor = input(true, { transform: booleanAttribute });

  protected readonly root = root;
  protected readonly caret = caret;
  protected readonly label = computed(() => this.words().join(", "));
  /** The typed text. It goes back to the first word when the words change. */
  protected readonly typed = linkedSignal(() => this.words()[0] ?? "");
  private readonly caretEl = viewChild<ElementRef<HTMLElement>>("caretEl");
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        words: this.words(),
        typeSpeed: this.typeSpeed(),
        deleteSpeed: this.deleteSpeed(),
        pause: this.pause(),
        loop: this.loop(),
      };
      const caretElement = this.caretEl()?.nativeElement;
      if (options.words.length === 0 || reducedMotion()) return;
      onCleanup(
        startTyping(this.host.nativeElement, caretElement, options, (text) =>
          this.typed.set(text),
        ),
      );
    });
  }
}
