import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChild,
  type ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from "@angular/core";

const root = "w-full";
const stack =
  "relative grid touch-pan-y rounded-xl pb-4 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const card =
  "group col-start-1 row-start-1 origin-bottom overflow-hidden rounded-xl border border-line bg-surface transition-[translate,scale,opacity,background-color] duration-300 ease-out data-[depth=0]:z-30 data-[depth=0]:cursor-grab data-[depth=1]:z-20 data-[depth=1]:translate-y-2 data-[depth=1]:scale-[0.95] data-[depth=1]:bg-subtle data-[depth=2]:z-10 data-[depth=2]:translate-y-4 data-[depth=2]:scale-[0.9] data-[depth=2]:bg-subtle data-[depth=3]:translate-y-4 data-[depth=3]:scale-[0.9] data-[depth=3]:opacity-0 data-dragging:cursor-grabbing data-dragging:transition-none data-leaving:z-40 motion-reduce:transition-none";
const content =
  "h-full opacity-0 transition-opacity duration-300 ease-out group-data-leaving:opacity-100 group-data-[depth=0]:opacity-100 motion-reduce:transition-none";
const controls = "mt-3 flex items-center justify-between gap-3";
const navButton =
  "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[background-color,scale] duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const dots = "flex items-center gap-1.5";
const dot =
  "h-1.5 w-1.5 rounded-full bg-primary-line transition-all duration-300 ease-out data-[state=active]:w-5 data-[state=active]:bg-primary motion-reduce:transition-none";
const icon = "size-4";
const srOnly = "sr-only";

const FLING_MS = 450;
const SETTLE_MS = 250;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
/** Share of the stack width a drag must pass to throw the card. */
const SWIPE_RATIO = 0.25;
/** Pixels of movement before a press becomes a drag, so clicks inside cards still work. */
const DRAG_START = 4;
const MAX_DEPTH = 3;

/** Fill {index} and {total} in a label. */
export const formatLabel = (template: string, index: number, total: number) =>
  template
    .replaceAll("{index}", String(index))
    .replaceAll("{total}", String(total));

const reducedMotion = () =>
  typeof matchMedia === "function" &&
  matchMedia("(prefers-reduced-motion: reduce)").matches;

const away = (direction: number) =>
  `translateX(${direction * 120}%) rotate(${direction * 14}deg)`;

function play(el: HTMLElement, keyframes: Keyframe[], duration: number) {
  if (reducedMotion() || typeof el.animate !== "function") return undefined;
  el.getAnimations().forEach((animation) => animation.finish());
  return el.animate(keyframes, { duration, easing: EASE });
}

/** Throw the card off to one side; it then fades in at the back of the stack. */
function fling(el: HTMLElement, direction: number) {
  const from = el.style.transform || "none";
  el.style.transform = "";
  delete el.dataset.dragging;
  el.dataset.leaving = "";
  const animation = play(
    el,
    [
      { transform: from, opacity: 1 },
      { opacity: 1, offset: 0.5 },
      { transform: away(direction), opacity: 0 },
    ],
    FLING_MS,
  );
  if (!animation) {
    delete el.dataset.leaving;
    return;
  }
  animation.onfinish = () => {
    delete el.dataset.leaving;
    play(el, [{ opacity: 0, offset: 0 }], SETTLE_MS);
  };
}

/** Slide a card back in from one side. */
const arrive = (el: HTMLElement, direction: number) =>
  play(
    el,
    [
      { transform: away(direction), opacity: 0 },
      { transform: "none", opacity: 1 },
    ],
    FLING_MS,
  );

/** Spring a dragged card back to the middle. */
function settle(el: HTMLElement) {
  const from = el.style.transform;
  el.style.transform = "";
  delete el.dataset.dragging;
  if (from) play(el, [{ transform: from }, { transform: "none" }], SETTLE_MS);
}

export type CardStackContext<T> = { $implicit: T; index: number };

let nextId = 0;

/**
 * One card per item, rendered by the projected `<ng-template let-item let-index="index">`.
 * Host stays out of layout; id and class move to the region.
 */
@Component({
  selector: "markas-card-stack",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <div
      [attr.id]="id() ?? null"
      role="region"
      aria-roledescription="carousel"
      [attr.aria-label]="label()"
      [class]="rootClasses()"
      (keydown)="handleKeydown($event)"
    >
      <div
        #stackEl
        [id]="stackId()"
        tabindex="0"
        [class]="stack"
        (pointerdown)="handlePointerdown($event)"
        (pointermove)="handlePointermove($event)"
        (pointerup)="handlePointerup($event)"
        (pointercancel)="handlePointercancel()"
      >
        @for (item of items(); track $index) {
          <div
            role="group"
            aria-roledescription="slide"
            [attr.aria-label]="cardName($index + 1)"
            [attr.data-depth]="depthOf($index)"
            [attr.inert]="depthOf($index) !== 0 ? '' : null"
            [class]="card"
          >
            <div [class]="content">
              <ng-container
                [ngTemplateOutlet]="template() ?? null"
                [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
              />
            </div>
          </div>
        }
      </div>
      <div [class]="controls">
        <button
          type="button"
          [attr.aria-label]="prevLabel()"
          [attr.aria-controls]="stackId()"
          [disabled]="total() < 2"
          [class]="navButton"
          (click)="go(-1)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="icon"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div aria-hidden="true" [class]="dots">
          @for (item of items(); track $index) {
            <span
              [attr.data-state]="$index === index() ? 'active' : 'inactive'"
              [class]="dot"
            ></span>
          }
        </div>
        <button
          type="button"
          [attr.aria-label]="nextLabel()"
          [attr.aria-controls]="stackId()"
          [disabled]="total() < 2"
          [class]="navButton"
          (click)="go(1)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="icon"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <p aria-live="polite" [class]="srOnly">{{ cardName(index() + 1) }}</p>
    </div>
  `,
})
export class CardStack<T = unknown> {
  readonly items = input.required<T[]>();
  /** Accessible name of the stack region. */
  readonly label = input("Card stack");
  readonly prevLabel = input("Previous card");
  readonly nextLabel = input("Next card");
  /** Name of each card and the live position text. Accepts {index} and {total}. */
  readonly cardLabel = input("{index} of {total}");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly template =
    contentChild<TemplateRef<CardStackContext<T>>>(TemplateRef);
  protected readonly stack = stack;
  protected readonly card = card;
  protected readonly content = content;
  protected readonly controls = controls;
  protected readonly navButton = navButton;
  protected readonly dots = dots;
  protected readonly dot = dot;
  protected readonly icon = icon;
  protected readonly srOnly = srOnly;
  protected readonly index = signal(0);
  protected readonly total = computed(() => this.items().length);
  private readonly generatedId = `markas-card-stack-${nextId++}`;
  protected readonly stackId = computed(
    () => `${this.id() ?? this.generatedId}-cards`,
  );
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly stackEl =
    viewChild.required<ElementRef<HTMLDivElement>>("stackEl");
  private drag: { x: number; moved: boolean } | null = null;
  private readonly changes = inject(ChangeDetectorRef);

  protected cardName(position: number) {
    return formatLabel(this.cardLabel(), position, this.total());
  }

  protected depthOf(i: number) {
    const total = this.total();
    return Math.min((i - this.index() + total) % total, MAX_DEPTH);
  }

  private cardAt(i: number) {
    return this.stackEl().nativeElement.children[i] as HTMLElement | undefined;
  }

  /** Step forward (throw the top card) or back (bring the last card in). */
  protected go(step: 1 | -1, direction = -1) {
    const total = this.total();
    if (total < 2) return;
    const target = (this.index() + step + total) % total;
    const top = this.cardAt(this.index());
    const incoming = this.cardAt(target);
    if (step === 1 && top) fling(top, direction);
    if (step === -1 && incoming) arrive(incoming, direction);
    this.index.set(target);
    // Render the new depths now (like React's sync update), so rapid key presses and drags read fresh state.
    this.changes.detectChanges();
  }

  protected handleKeydown(event: KeyboardEvent) {
    const steps: Record<string, 1 | -1 | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const step = steps[event.key];
    if (step === undefined || event.defaultPrevented) return;
    event.preventDefault();
    this.go(step);
  }

  protected handlePointerdown(event: PointerEvent) {
    if (event.button !== 0 || this.total() < 2) return;
    this.drag = { x: event.clientX, moved: false };
  }

  protected handlePointermove(event: PointerEvent) {
    const top = this.cardAt(this.index());
    if (!this.drag || !top) return;
    const dx = event.clientX - this.drag.x;
    if (!this.drag.moved) {
      if (Math.abs(dx) < DRAG_START) return;
      this.drag.moved = true;
      this.stackEl().nativeElement.setPointerCapture?.(event.pointerId);
      top.dataset.dragging = "";
    }
    top.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`;
  }

  protected handlePointerup(event: PointerEvent) {
    const state = this.drag;
    this.drag = null;
    const top = this.cardAt(this.index());
    if (!state?.moved || !top) return;
    const dx = event.clientX - state.x;
    if (Math.abs(dx) > this.stackEl().nativeElement.offsetWidth * SWIPE_RATIO)
      this.go(1, Math.sign(dx));
    else settle(top);
  }

  protected handlePointercancel() {
    const top = this.cardAt(this.index());
    if (this.drag?.moved && top) settle(top);
    this.drag = null;
  }
}
