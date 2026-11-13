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

export type StackingCardsVariant = "scale" | "fan" | "blur";

const base =
  "relative grid [&>*]:sticky [&>*]:top-[calc(var(--stack-top)+var(--stack-i,0)*var(--stack-step))] [&>*]:origin-top [&>*]:transition-[scale,rotate,filter] [&>*]:duration-150 [&>*]:ease-out motion-reduce:[&>*]:transition-none [&>*:has(:focus-visible)]:z-10 [&>*:has(:focus-visible)]:[scale:1] [&>*:has(:focus-visible)]:[rotate:0deg] [&>*:has(:focus-visible)]:[filter:none]";
const variants: Record<StackingCardsVariant, string> = {
  scale:
    "[&>*]:[scale:calc(1-var(--stack-depth,0)*0.05)] [&>*]:[filter:brightness(calc(1-var(--stack-depth,0)*0.12))]",
  fan: "[&>*]:[rotate:calc(var(--stack-depth,0)*var(--stack-turn,1)*2.5deg)] [&>*]:[scale:calc(1-var(--stack-depth,0)*0.02)]",
  blur: "[&>*]:[filter:blur(calc(var(--stack-depth,0)*1.5px))_brightness(calc(1-var(--stack-depth,0)*0.08))]",
};

const MAX_DEPTH = 6;

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/**
 * Give every card its index, then, while the stack is on screen, set --stack-depth on each card:
 * how many of the cards after it already cover it (0 to 1 each), from layout boxes that ignore transforms.
 */
function createStack(root: HTMLElement, step: number) {
  const cards = () => [...root.children] as HTMLElement[];
  cards().forEach((card, i) => {
    card.style.setProperty("--stack-i", String(i));
    card.style.setProperty("--stack-turn", i % 2 ? "1" : "-1");
  });
  if (still() || typeof IntersectionObserver !== "function") return () => {};

  let frame = 0;
  const update = () => {
    frame = 0;
    const list = cards();
    let depth = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      const card = list[i]!;
      card.style.setProperty(
        "--stack-depth",
        String(Math.round(Math.min(depth, MAX_DEPTH) * 1000) / 1000),
      );
      const prev = list[i - 1];
      if (!prev) continue;
      const gap = card.offsetTop - prev.offsetTop;
      depth += clamp(
        (prev.offsetHeight - gap) / Math.max(prev.offsetHeight - step, 1),
      );
    }
  };
  const schedule = () => {
    frame ||= requestAnimationFrame(update);
  };
  const listen = (on: boolean) => {
    const method = on ? "addEventListener" : "removeEventListener";
    document[method]("scroll", schedule, { capture: true, passive: true });
    window[method]("resize", schedule);
  };
  const observer = new IntersectionObserver(([entry]) => {
    listen(Boolean(entry?.isIntersecting));
    schedule();
  });
  observer.observe(root);
  return () => {
    observer.disconnect();
    listen(false);
    cancelAnimationFrame(frame);
  };
}

/** Every projected element is one card. The host stays out of layout; the user's class and role land on the stack. */
@Component({
  selector: "markas-stacking-cards",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.role]": "null" },
  template: `
    <div
      #rootEl
      [attr.role]="role()"
      [class]="classes()"
      [style.--stack-top]="top() + 'px'"
      [style.--stack-step]="offset() + 'px'"
    >
      <ng-content />
    </div>
  `,
})
export class StackingCards {
  /** What happens to the cards that the next ones cover. */
  readonly variant = input<StackingCardsVariant>("scale");
  /** Sticky top of the first card in px. */
  readonly top = input(16, { transform: numberAttribute });
  /** Extra px each later card sticks below the one before, so earlier cards peek out. */
  readonly offset = input(16, { transform: numberAttribute });
  /** Lands on the stack, for example role="list" around li cards. */
  readonly role = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly classes = computed(() =>
    [base, variants[this.variant()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
  private readonly root = viewChild.required<ElementRef<HTMLElement>>("rootEl");

  constructor() {
    afterRenderEffect((onCleanup) => {
      onCleanup(createStack(this.root().nativeElement, this.offset()));
    });
  }
}
