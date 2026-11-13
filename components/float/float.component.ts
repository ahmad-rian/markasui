import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  numberAttribute,
  viewChild,
} from "@angular/core";

const base =
  "[&>*]:transition-[translate] [&>*]:duration-700 [&>*]:ease-out motion-reduce:[&>*]:transition-none";

export type FloatMotion = "drift" | "bob" | "orbit" | "breathe";
type Options = {
  motion: FloatMotion;
  amplitude: number;
  duration: number;
  seed: number;
  parallax: number;
  entrance: boolean;
};

const STEPS = 12;
const TURN = Math.PI * 2;
const MS = 1000;
const STAGGER_MS = 90;
const ENTRANCE_MS = 600;
/** One loop of each motion: phase t (0 to 1) and amplitude a give x, y (px), rotation (deg), and scale. */
const PATHS: Record<FloatMotion, (t: number, a: number) => number[]> = {
  drift: (t, a) => [
    a * 0.6 * Math.sin(TURN * t),
    a * 0.5 * Math.sin(TURN * 2 * t),
    a * 0.3 * Math.sin(TURN * t),
    1,
  ],
  bob: (t, a) => [0, (-a * (1 - Math.cos(TURN * t))) / 2, 0, 1],
  orbit: (t, a) => [a * Math.cos(TURN * t), a * Math.sin(TURN * t), 0, 1],
  breathe: (t, a) => {
    const k = (1 - Math.cos(TURN * t)) / 2;
    return [0, -a * 0.3 * k, 0, 1 + (a / 100) * k];
  },
};

/** Same number for the same seed and index in every framework. */
const rand = (seed: number, n: number) => {
  const x = Math.sin(seed * 78.233 + n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};
const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Float each child on its own loop, pause one while it is hovered or focused, and pause all
 * when off screen. With parallax, children shift toward the pointer by their depth.
 */
export function startFloat(root: HTMLElement, o: Options) {
  const items = [...root.children] as HTMLElement[];
  const path = PATHS[o.motion] ?? PATHS.drift;
  const loops = items.map((el, i) => {
    const amp = o.amplitude * (0.7 + 0.6 * rand(o.seed, i * 4));
    const sign = rand(o.seed, i * 4 + 1) < 0.5 ? -1 : 1;
    const ms = o.duration * MS * (0.8 + 0.4 * rand(o.seed, i * 4 + 2));
    const frames = Array.from({ length: STEPS + 1 }, (_, s) => {
      const [x, y, r, k] = path(s / STEPS, amp);
      return {
        transform: `translate(${x! * sign}px, ${y}px) rotate(${r! * sign}deg) scale(${k})`,
      };
    });
    return el.animate?.(frames, {
      duration: ms,
      delay: -rand(o.seed, i * 4 + 3) * ms,
      iterations: Infinity,
    });
  });
  const held = new Set<number>();
  let hidden = false;
  let entered = !o.entrance;
  /** Rise in one after another the first time the group scrolls into view. */
  const enter = () => {
    entered = true;
    items.forEach((el, i) =>
      el.animate?.(
        [
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1 },
        ],
        {
          duration: ENTRANCE_MS,
          delay: i * STAGGER_MS,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          fill: "backwards",
        },
      ),
    );
  };
  const sync = () =>
    loops.forEach((loop, i) =>
      hidden || held.has(i) ? loop?.pause() : loop?.play(),
    );
  const hold = (on: boolean) => (e: Event) => {
    const i = items.findIndex((el) => el.contains(e.target as Node));
    const to = (e as FocusEvent).relatedTarget as Node | null;
    if (i < 0 || (!on && items[i]!.contains(to))) return;
    if (on) held.add(i);
    else held.delete(i);
    sync();
  };
  const pointer = (e: PointerEvent) => {
    const r = root.getBoundingClientRect();
    const nx = Math.max(
      -1,
      Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1),
    );
    const ny = Math.max(
      -1,
      Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1),
    );
    items.forEach((el, i) => {
      const depth = Number(
        el.dataset.depth ?? 0.3 + 0.7 * rand(o.seed, i * 4 + 1),
      );
      el.style.translate = `${nx * depth * o.parallax}px ${ny * depth * o.parallax}px`;
    });
  };
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver(([entry]) => {
          hidden = !entry?.isIntersecting;
          if (!hidden && !entered) enter();
          sync();
          if (!o.parallax) return;
          if (hidden) removeEventListener("pointermove", pointer);
          else addEventListener("pointermove", pointer);
        });
  if (observer) observer.observe(root);
  else {
    if (!entered) enter();
    if (o.parallax) addEventListener("pointermove", pointer);
  }
  const listeners = [
    ["pointerover", hold(true)],
    ["pointerout", hold(false)],
    ["focusin", hold(true)],
    ["focusout", hold(false)],
  ] as [string, (e: Event) => void][];
  for (const [type, fn] of listeners) root.addEventListener(type, fn);
  return () => {
    observer?.disconnect();
    removeEventListener("pointermove", pointer);
    for (const [type, fn] of listeners) root.removeEventListener(type, fn);
    for (const loop of loops) loop?.cancel();
    for (const el of items) el.style.translate = "";
  };
}

/**
 * Every projected child floats. Host stays out of layout; aria-hidden and class move to the
 * group.
 */
@Component({
  selector: "markas-float",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.aria-hidden]": "null" },
  template: `
    <div
      #groupEl
      [attr.aria-hidden]="ariaHidden() ?? null"
      [class]="rootClasses()"
    >
      <ng-content />
    </div>
  `,
})
export class Float {
  /** Path each child follows: wander, rise and fall, circle, or swell. */
  readonly motion = input<FloatMotion>("drift");
  /** Distance in px each child travels, varied a little per child. For breathe, also the growth in percent. */
  readonly amplitude = input(10, { transform: numberAttribute });
  /** Seconds for one loop, varied a little per child. */
  readonly duration = input(6, { transform: numberAttribute });
  /** Changes the per-child timing, size, and direction. */
  readonly seed = input(1, { transform: numberAttribute });
  /** Largest shift in px toward the pointer. 0 turns it off. */
  readonly parallax = input(0, { transform: numberAttribute });
  /** Children pop in one after another the first time the group scrolls into view. */
  readonly entrance = input(false, { transform: booleanAttribute });
  readonly ariaHidden = input<string | undefined>(undefined, {
    alias: "aria-hidden",
  });
  readonly userClass = input("", { alias: "class" });

  protected readonly rootClasses = computed(() =>
    [base, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly groupEl =
    viewChild.required<ElementRef<HTMLDivElement>>("groupEl");

  constructor() {
    // Runs after the children are in the DOM, and again when an option changes.
    afterRenderEffect((onCleanup) => {
      const options = {
        motion: this.motion(),
        amplitude: this.amplitude(),
        duration: this.duration(),
        seed: this.seed(),
        parallax: this.parallax(),
        entrance: this.entrance(),
      };
      if (still()) return;
      onCleanup(startFloat(this.groupEl().nativeElement, options));
    });
  }
}
