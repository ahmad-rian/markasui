import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  numberAttribute,
  viewChild,
} from "@angular/core";

const base =
  "w-fit transition-[translate,scale] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] has-[:focus-visible]:scale-105 data-[state=active]:duration-150 data-[state=active]:ease-out motion-reduce:transition-none [&_[data-depth]]:inline-block [&_[data-depth]]:transition-[translate] [&_[data-depth]]:duration-500 [&_[data-depth]]:ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=active]:[&_[data-depth]]:duration-150 motion-reduce:[&_[data-depth]]:transition-none";

export type MagnetMode = "attract" | "repel";
type Options = { strength: number; radius: number; mode: MagnetMode };

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Pull the element toward (or push it away from) a mouse within `radius` px of its edges, then let
 * it spring back. Children with data-depth="0.5" travel that much further. Listens only while on screen.
 */
function startMagnet(root: HTMLElement, o: Options) {
  let x = 0;
  let y = 0;
  const set = (nx: number, ny: number) => {
    x = nx;
    y = ny;
    if (x || y) root.dataset.state = "active";
    else delete root.dataset.state;
    root.style.translate = x || y ? `${x}px ${y}px` : "";
    for (const layer of root.querySelectorAll<HTMLElement>("[data-depth]")) {
      const depth = Number(layer.dataset.depth) || 0;
      layer.style.translate = x || y ? `${x * depth}px ${y * depth}px` : "";
    }
  };
  const move = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = root.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2 - x);
    const dy = e.clientY - (r.top + r.height / 2 - y);
    const gap = Math.hypot(
      Math.max(Math.abs(dx) - r.width / 2, 0),
      Math.max(Math.abs(dy) - r.height / 2, 0),
    );
    const near = Math.max(1 - gap / o.radius, 0);
    if (o.mode === "repel") {
      const push = (near * o.radius * o.strength) / (Math.hypot(dx, dy) || 1);
      return set(-dx * push, -dy * push);
    }
    set(dx * near * o.strength, dy * near * o.strength);
  };
  const reset = () => set(0, 0);
  const html = document.documentElement;
  const listen = (on: boolean) => {
    if (on) {
      document.addEventListener("pointermove", move);
      html.addEventListener("pointerleave", reset);
      return;
    }
    document.removeEventListener("pointermove", move);
    html.removeEventListener("pointerleave", reset);
    reset();
  };
  const observer =
    typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver(([entry]) => listen(!!entry?.isIntersecting));
  if (observer) observer.observe(root);
  else listen(true);
  return () => {
    observer?.disconnect();
    listen(false);
  };
}

/**
 * Wraps one element, usually a button or link. The host stays out of layout; the user's class
 * lands on the moving wrapper.
 */
@Component({
  selector: "markas-magnet",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `<div #rootEl [class]="classes()"><ng-content /></div>`,
})
export class Magnet {
  /** Share of the pointer distance the element follows, 0 to 1. For repel, how far it is pushed. */
  readonly strength = input(0.35, { transform: numberAttribute });
  /** Distance in px beyond the element edges where the pull starts. */
  readonly radius = input(80, { transform: numberAttribute });
  /** Move toward the pointer or away from it. */
  readonly mode = input<MagnetMode>("attract");
  readonly userClass = input("", { alias: "class" });

  protected readonly classes = computed(() =>
    [base, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly root = viewChild.required<ElementRef<HTMLElement>>("rootEl");

  constructor() {
    afterRenderEffect((onCleanup) => {
      const options = {
        strength: this.strength(),
        radius: this.radius(),
        mode: this.mode(),
      };
      if (still()) return;
      onCleanup(startMagnet(this.root().nativeElement, options));
    });
  }
}
