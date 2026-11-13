import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from "@angular/core";

const root = "inline";
const letter =
  "transition-[font-variation-settings,font-weight] duration-200 ease-out motion-reduce:transition-none";

/** One breath of the wave (ms) and the phase step between letters (radians). */
const WAVE_PERIOD = 2400;
const WAVE_PHASE = 0.45;

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Sets the weight through the wght axis of a variable font, with font-weight as a fallback. */
const setWeight = (el: HTMLElement, value: number) => {
  el.style.fontVariationSettings = `'wght' ${value}`;
  el.style.fontWeight = String(value);
};

type WeightOptions = {
  radius: number;
  min: number;
  max: number;
  wave: boolean;
};

/** Follows the pointer (and runs the wave) on the letters inside `element`. Returns a stop function. */
function startWeights(element: HTMLElement, options: WeightOptions) {
  const { radius, min, max, wave } = options;
  const letters = [...element.querySelectorAll<HTMLElement>("[data-letter]")];
  const set = (values: number[]) =>
    letters.forEach((el, i) => setWeight(el, values[i]!));
  let pointer: { x: number; y: number } | undefined;
  let visible = false;
  let frame = 0;

  // The letter closest to the cursor is boldest; outside the radius it goes back to min. Without a cursor, wave breathes.
  const draw = (now: number) => {
    frame = 0;
    const span = max - min;
    const near = pointer
      ? letters.map((el) => {
          const rect = el.getBoundingClientRect();
          const distance = Math.hypot(
            pointer!.x - (rect.left + rect.width / 2),
            pointer!.y - (rect.top + rect.height / 2),
          );
          return Math.min(distance / radius, 1);
        })
      : [];
    if (near.some((t) => t < 1))
      return set(
        near.map((t) =>
          Math.round(min + span * (0.5 + 0.5 * Math.cos(Math.PI * t))),
        ),
      );
    if (!wave) return set(letters.map(() => min));
    set(
      letters.map((_, i) =>
        Math.round(
          min +
            span *
              (0.5 -
                0.5 *
                  Math.cos((now / WAVE_PERIOD) * 2 * Math.PI - i * WAVE_PHASE)),
        ),
      ),
    );
    if (visible) frame = requestAnimationFrame(draw);
  };
  const schedule = () => {
    if (!frame && visible) frame = requestAnimationFrame(draw);
  };
  const move = (event: PointerEvent) => {
    pointer = { x: event.clientX, y: event.clientY };
    schedule();
  };
  const out = () => {
    pointer = undefined;
    schedule();
  };

  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver((entries) => {
          visible = entries.some((entry) => entry.isIntersecting);
          cancelAnimationFrame(frame);
          frame = 0;
          schedule();
        });
  visible = !observer;
  observer?.observe(element);
  schedule();
  addEventListener("pointermove", move);
  document.documentElement.addEventListener("pointerleave", out);
  return () => {
    observer?.disconnect();
    cancelAnimationFrame(frame);
    removeEventListener("pointermove", move);
    document.documentElement.removeEventListener("pointerleave", out);
    set(letters.map(() => min));
  };
}

/** Attribute selector on a span, so the user's class and aria-* stay on the root. */
@Component({
  selector: "span[markas-variable-weight-text]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root" },
  template: `<span class="sr-only">{{ text() }}</span>
    @for (char of chars(); track $index) {
      <span
        aria-hidden="true"
        data-letter=""
        [class]="letter"
        [style.font-variation-settings]="restSettings()"
        [style.font-weight]="min()"
        >{{ char }}</span
      >
    }`,
})
export class VariableWeightText {
  readonly text = input.required<string>();
  readonly radius = input(120, { transform: numberAttribute });
  readonly min = input(300, { transform: numberAttribute });
  readonly max = input(800, { transform: numberAttribute });
  readonly wave = input(false, { transform: booleanAttribute });

  protected readonly root = root;
  protected readonly letter = letter;
  protected readonly chars = computed(() => Array.from(this.text()));
  protected readonly restSettings = computed(() => `'wght' ${this.min()}`);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        radius: this.radius(),
        min: this.min(),
        max: this.max(),
        wave: this.wave(),
      };
      this.chars();
      if (reducedMotion()) return;
      onCleanup(startWeights(this.host.nativeElement, options));
    });
  }
}
