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

export type PixelTrailVariant = "pixel" | "dot" | "brush";

const base = "relative isolate overflow-hidden";
const canvasClass = "pointer-events-none absolute inset-0 -z-10 size-full";
const gridClass =
  "bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[var(--cell)_var(--cell)]";
const colors = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  ink: "text-ink",
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");
const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

type TrailOptions = {
  size: number;
  fade: number;
  variant: PixelTrailVariant;
  autoplay: boolean;
};

/** Run `tick` on every frame while the element is on screen and the tab is visible. */
function whileVisible(element: Element, tick: (now: number) => void) {
  let frame = 0;
  let seen = false;
  const run = (now: number) => {
    tick(now);
    frame = requestAnimationFrame(run);
  };
  const sync = () => {
    cancelAnimationFrame(frame);
    if (seen && !document.hidden) frame = requestAnimationFrame(run);
  };
  const observer = new IntersectionObserver(([entry]) => {
    seen = Boolean(entry?.isIntersecting);
    sync();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", sync);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    cancelAnimationFrame(frame);
  };
}

/**
 * Light the cell under the pointer on a canvas and fade it out over `fade` ms. Keyboard focus lights
 * the cells around the focused element. The canvas only redraws while some cell is still lit.
 */
function createPixels(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
  options: TrailOptions,
) {
  const { size, fade, variant } = options;
  const context = canvas.getContext?.("2d");
  if (!context || still()) return () => {};
  const lit = new Map<string, { time: number; strength: number }>();
  let last: { x: number; y: number } | null = null;
  let frame = 0;
  let color = "";

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const draw = (now: number) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    for (const [key, cell] of lit) {
      const alpha = cell.strength * (1 - (now - cell.time) / fade);
      if (alpha <= 0) {
        lit.delete(key);
        continue;
      }
      const [col = 0, row = 0] = key.split(",").map(Number);
      context.globalAlpha = Math.min(alpha, 1);
      context.beginPath();
      if (variant === "dot")
        context.arc((col + 0.5) * size, (row + 0.5) * size, size * 0.32, 0, 7);
      else context.rect(col * size + 0.5, row * size + 0.5, size - 1, size - 1);
      context.fill();
    }
    frame = lit.size ? requestAnimationFrame(draw) : 0;
  };
  const light = (col: number, row: number, strength = 1) => {
    const key = `${col},${row}`;
    const time = performance.now();
    const current = lit.get(key);
    if (!current || current.strength * 0.8 <= strength)
      lit.set(key, { time, strength });
    if (frame) return;
    color = getComputedStyle(canvas).color;
    frame = requestAnimationFrame(draw);
  };
  const paint = (x: number, y: number) => {
    const col = Math.floor(x / size);
    const row = Math.floor(y / size);
    light(col, row);
    if (variant !== "brush") return;
    for (let dx = -2; dx <= 2; dx++)
      for (let dy = -2; dy <= 2; dy++) {
        const far = Math.max(Math.abs(dx), Math.abs(dy));
        if (far) light(col + dx, row + dy, far === 1 ? 0.5 : 0.2);
      }
  };
  /** Paint every half cell between the last point and this one, so fast moves leave no gaps. */
  const trail = (x: number, y: number) => {
    const from = last ?? { x, y };
    const steps = Math.max(
      1,
      Math.ceil(Math.hypot(x - from.x, y - from.y) / (size / 2)),
    );
    for (let i = 1; i <= steps; i++)
      paint(
        from.x + ((x - from.x) * i) / steps,
        from.y + ((y - from.y) * i) / steps,
      );
    last = { x, y };
  };

  let inside = false;
  const move = (event: PointerEvent) => {
    inside = true;
    const rect = root.getBoundingClientRect();
    trail(event.clientX - rect.left, event.clientY - rect.top);
  };
  const leave = () => {
    inside = false;
    last = null;
  };
  const focus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target === root || !target.matches?.(":focus-visible")) return;
    const box = root.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const left = Math.floor((rect.left - box.left) / size) - 1;
    const top = Math.floor((rect.top - box.top) / size) - 1;
    const right = Math.floor((rect.right - box.left) / size) + 1;
    const bottom = Math.floor((rect.bottom - box.top) / size) + 1;
    for (let col = left; col <= right; col++)
      for (let row = top; row <= bottom; row++)
        if (col === left || col === right || row === top || row === bottom)
          light(col, row, 0.8);
  };

  resize();
  const observer =
    typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
  observer?.observe(canvas);
  root.addEventListener("pointermove", move);
  root.addEventListener("pointerleave", leave);
  root.addEventListener("focusin", focus);
  const stopAuto =
    options.autoplay && typeof IntersectionObserver === "function"
      ? whileVisible(root, (now) => {
          if (inside) return;
          const t = now / 1000;
          trail(
            canvas.clientWidth * (0.5 + 0.42 * Math.sin(t * 1.3)),
            canvas.clientHeight * (0.5 + 0.36 * Math.sin(t * 0.9 + 1)),
          );
        })
      : null;

  return () => {
    observer?.disconnect();
    root.removeEventListener("pointermove", move);
    root.removeEventListener("pointerleave", leave);
    root.removeEventListener("focusin", focus);
    stopAuto?.();
    cancelAnimationFrame(frame);
  };
}

export type PixelTrailColor = keyof typeof colors;

/** The host stays out of layout; the user's class lands on the area. */
@Component({
  selector: "markas-pixel-trail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <div #rootEl [class]="classes()" [style.--cell]="cellSize() + 'px'">
      <canvas #canvasEl aria-hidden="true" [class]="canvasClasses()"></canvas>
      <ng-content />
    </div>
  `,
})
export class PixelTrail {
  /** Side of one cell in px. */
  readonly cellSize = input(24, { transform: numberAttribute });
  /** How long a lit cell takes to fade out, in ms. */
  readonly fade = input(600, { transform: numberAttribute });
  /** Shape of the light: square pixels, round dots, or a soft brush that also lights the neighbours. */
  readonly variant = input<PixelTrailVariant>("pixel");
  /** Light color token. */
  readonly color = input<PixelTrailColor>("primary");
  /** Draws faint grid lines between the cells. */
  readonly showGrid = input(false, { transform: booleanAttribute });
  /** Draws a trail on its own while visible and the pointer is elsewhere. */
  readonly autoplay = input(false, { transform: booleanAttribute });
  readonly userClass = input("", { alias: "class" });

  protected readonly classes = computed(() => cx(base, this.userClass()));
  protected readonly canvasClasses = computed(() =>
    cx(canvasClass, colors[this.color()], this.showGrid() && gridClass),
  );
  private readonly root = viewChild.required<ElementRef<HTMLElement>>("rootEl");
  private readonly canvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>("canvasEl");

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        size: this.cellSize(),
        fade: this.fade(),
        variant: this.variant(),
        autoplay: this.autoplay(),
      };
      onCleanup(
        createPixels(
          this.root().nativeElement,
          this.canvas().nativeElement,
          options,
        ),
      );
    });
  }
}
