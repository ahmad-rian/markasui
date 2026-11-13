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

export type ElasticLineVariant = "pull" | "push" | "pluck";
export type ElasticLineOrientation = "horizontal" | "vertical";

const base = "relative block";
const orientations: Record<ElasticLineOrientation, string> = {
  horizontal: "h-[calc(var(--reach)*2)]",
  vertical: "w-[calc(var(--reach)*2)] self-stretch",
};
const colors = {
  line: "text-line",
  muted: "text-muted",
  ink: "text-ink",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};
const svgClass =
  "pointer-events-none absolute inset-0 size-full overflow-visible";
const pathClass = "fill-none stroke-current [vector-effect:non-scaling-stroke]";

/** Spring per variant: k pulls toward the target, d keeps that share of the speed each frame. */
const SPRINGS = {
  pull: { k: 0.12, d: 0.82 },
  push: { k: 0.1, d: 0.8 },
  pluck: { k: 0.3, d: 0.6 },
  release: { k: 0.18, d: 0.93 },
};
const REST = 0.05;

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Quadratic curve in a 0 to 100 box. The control sits at twice the bend so the line peaks at the bend. */
export const curve = (vertical: boolean, along = 50, bend = 0) =>
  vertical
    ? `M50 0Q${50 + 2 * bend} ${along} 50 100`
    : `M0 50Q${along} ${50 + 2 * bend} 100 50`;

/**
 * Bend the line toward (pull), away from (push), or with the pointer until it slips (pluck), then spring
 * back. requestAnimationFrame only runs while the pointer is near or the line still moves.
 */
function createLine(
  root: HTMLElement,
  path: SVGPathElement,
  vertical: boolean,
  variant: ElasticLineVariant,
  playOnView: boolean,
) {
  let pointer: { along: number; perp: number } | null = null;
  let along = 50;
  let bend = 0;
  let speed = 0;
  let grabbed = false;
  let frame = 0;
  const reach = () => {
    const rect = root.getBoundingClientRect();
    return (vertical ? rect.width : rect.height) / 2 || 1;
  };

  const step = () => {
    const half = reach();
    let target = 0;
    let spring = SPRINGS.release;
    if (pointer) {
      along = Math.min(Math.max(pointer.along, 10), 90);
      const perp = pointer.perp;
      if (variant === "pull") target = perp;
      if (variant === "push")
        target = -Math.sign(perp || 1) * (half - Math.abs(perp)) * 0.6;
      if (variant === "pluck") {
        if (Math.abs(perp) > half * 0.8) grabbed = false;
        if (grabbed) target = perp;
      }
      if (variant !== "pluck") spring = SPRINGS[variant];
      else if (grabbed) spring = SPRINGS.pluck;
    }
    speed = (speed + (target - bend) * spring.k) * spring.d;
    bend += speed;
    const settled = !pointer && Math.abs(bend) < REST && Math.abs(speed) < REST;
    if (settled) bend = speed = 0;
    path.setAttribute("d", curve(vertical, along, (bend / half) * 50));
    frame = settled ? 0 : requestAnimationFrame(step);
  };
  const wake = () => {
    frame ||= requestAnimationFrame(step);
  };

  const move = (event: PointerEvent) => {
    if (still()) return;
    const rect = root.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const next = vertical
      ? { along: (y / rect.height) * 100, perp: x - rect.width / 2 }
      : { along: (x / rect.width) * 100, perp: y - rect.height / 2 };
    // Pluck grabs when the pointer touches or crosses the line, even between two frames.
    const crossed = pointer && Math.sign(pointer.perp) !== Math.sign(next.perp);
    if (Math.abs(next.perp) < 6 || crossed) grabbed = true;
    pointer = next;
    wake();
  };
  const leave = () => {
    pointer = null;
    grabbed = false;
    wake();
  };
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", leave);

  // Twang once when the line first scrolls into view.
  let observer: IntersectionObserver | null = null;
  if (playOnView && !still() && typeof IntersectionObserver === "function") {
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer?.disconnect();
      speed = reach() * 0.5;
      wake();
    });
    observer.observe(root);
  }

  return () => {
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", leave);
    observer?.disconnect();
    cancelAnimationFrame(frame);
  };
}

/** Host stays out of layout; class moves to the line. */
@Component({
  selector: "markas-elastic-line",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div
      #lineEl
      [attr.role]="decorative() ? null : 'separator'"
      [attr.aria-orientation]="decorative() ? null : orientation()"
      [attr.aria-hidden]="decorative() ? 'true' : null"
      [class]="rootClasses()"
      [style.--reach]="reach() + 'px'"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        [class]="svgClass"
      >
        <path
          #pathEl
          [attr.d]="straight()"
          [attr.stroke-width]="strokeWidth()"
          stroke-linecap="round"
          [class]="pathClass"
        />
      </svg>
    </div>
  `,
})
export class ElasticLine {
  /** How the line answers the pointer. */
  readonly variant = input<ElasticLineVariant>("pull");
  /** Direction of the line. */
  readonly orientation = input<ElasticLineOrientation>("horizontal");
  /** Px on each side of the line where the pointer bends it, and the most it can bend. */
  readonly reach = input(24, { transform: numberAttribute });
  /** Line color token. */
  readonly color = input<keyof typeof colors>("line");
  /** Line width in px. */
  readonly strokeWidth = input(1.5, { transform: numberAttribute });
  /** Twangs once when the line first scrolls into view. */
  readonly playOnView = input(false, { transform: booleanAttribute });
  /** Hides the line from assistive tech instead of announcing a separator. */
  readonly decorative = input(false, { transform: booleanAttribute });
  readonly userClass = input("", { alias: "class" });

  protected readonly svgClass = svgClass;
  protected readonly pathClass = pathClass;
  private readonly vertical = computed(() => this.orientation() === "vertical");
  protected readonly straight = computed(() => curve(this.vertical()));
  protected readonly rootClasses = computed(() =>
    [
      base,
      orientations[this.orientation()],
      colors[this.color()],
      this.userClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );
  private readonly lineEl =
    viewChild.required<ElementRef<HTMLDivElement>>("lineEl");
  private readonly pathEl =
    viewChild.required<ElementRef<SVGPathElement>>("pathEl");

  constructor() {
    afterRenderEffect((onCleanup) => {
      const stop = createLine(
        this.lineEl().nativeElement,
        this.pathEl().nativeElement,
        this.vertical(),
        this.variant(),
        this.playOnView(),
      );
      onCleanup(stop);
    });
  }
}
