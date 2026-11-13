import { NgTemplateOutlet } from "@angular/common";
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  type ElementRef,
  input,
  signal,
  TemplateRef,
  viewChild,
} from "@angular/core";

const root = "w-full";
const viewport =
  "relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden";
const slideClass = "min-w-0 shrink-0 snap-start";
const perViews = {
  1: "basis-full",
  2: "basis-[calc((100%-1rem)/2)]",
  3: "basis-[calc((100%-2rem)/3)]",
};
const controls = "mt-3 flex items-center gap-2";
const dots = "flex items-center";
const dot =
  "group inline-flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const dotMark =
  "h-2 w-2 rounded-full bg-faint transition-all duration-150 ease-out group-data-[state=active]:w-4 group-data-[state=active]:bg-primary motion-reduce:transition-none";
const buttons = "ml-auto flex items-center gap-2";
const navButton =
  "inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const icon = "size-4";

/** Fill the {index} and {total} placeholders in a label. */
export const formatLabel = (template: string, index: number, total: number) =>
  template
    .replaceAll("{index}", String(index))
    .replaceAll("{total}", String(total));

export type CarouselSlideContext<T> = { $implicit: T; index: number };

let nextId = 0;

/**
 * One slide per item, rendered by the projected `<ng-template let-item let-index="index">`.
 * Host stays out of layout; id and class move to the region.
 */
@Component({
  selector: "markas-carousel",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <div
      [id]="carouselId()"
      role="region"
      aria-roledescription="carousel"
      [attr.aria-label]="label()"
      [class]="rootClass()"
      (keydown)="handleKeydown($event)"
    >
      <div
        #viewportEl
        [id]="viewportId()"
        tabindex="0"
        [class]="viewport"
        (scroll)="sync()"
      >
        @for (item of items(); track $index) {
          <div
            role="group"
            aria-roledescription="slide"
            [attr.aria-label]="format(slideLabel(), $index + 1)"
            [class]="slideClasses()"
          >
            @if (slide(); as template) {
              <ng-container
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
              />
            }
          </div>
        }
      </div>
      <div [class]="controls">
        @if (showDots()) {
          <div [class]="dots">
            @for (item of items(); track $index) {
              <button
                type="button"
                [attr.aria-label]="format(dotLabel(), $index + 1)"
                [attr.aria-controls]="viewportId()"
                [attr.aria-current]="$index === index() ? 'true' : null"
                [attr.data-state]="$index === index() ? 'active' : 'inactive'"
                [class]="dot"
                (click)="goTo($index)"
              >
                <span aria-hidden="true" [class]="dotMark"></span>
              </button>
            }
          </div>
        }
        <div [class]="buttons">
          <button
            type="button"
            [attr.aria-label]="previousLabel()"
            [attr.aria-controls]="viewportId()"
            [disabled]="atStart()"
            [class]="navButton"
            (click)="step(-1)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              [attr.class]="icon"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            [attr.aria-label]="nextLabel()"
            [attr.aria-controls]="viewportId()"
            [disabled]="atEnd()"
            [class]="navButton"
            (click)="step(1)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              [attr.class]="icon"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class Carousel<T = unknown> {
  readonly items = input.required<T[]>();
  readonly label = input("Carousel");
  readonly perView = input<keyof typeof perViews>(1);
  readonly showDots = input(false, { transform: booleanAttribute });
  readonly previousLabel = input("Previous slide");
  readonly nextLabel = input("Next slide");
  readonly slideLabel = input("{index} of {total}");
  readonly dotLabel = input("Go to slide {index}");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly slide =
    contentChild<TemplateRef<CarouselSlideContext<T>>>(TemplateRef);
  protected readonly viewport = viewport;
  protected readonly controls = controls;
  protected readonly dots = dots;
  protected readonly dot = dot;
  protected readonly dotMark = dotMark;
  protected readonly buttons = buttons;
  protected readonly navButton = navButton;
  protected readonly icon = icon;
  protected readonly index = signal(0);
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);
  private readonly generatedId = `markas-carousel-${nextId++}`;
  protected readonly carouselId = computed(() => this.id() ?? this.generatedId);
  protected readonly viewportId = computed(
    () => `${this.carouselId()}-viewport`,
  );
  protected readonly rootClass = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly slideClasses = computed(
    () => `${slideClass} ${perViews[this.perView()]}`,
  );
  private readonly viewportRef =
    viewChild.required<ElementRef<HTMLDivElement>>("viewportEl");

  constructor() {
    afterNextRender(() => this.sync());
  }

  protected format(template: string, index: number) {
    return formatLabel(template, index, this.items().length);
  }

  /** Read the nearest slide and whether the viewport is at its left or right edge. */
  protected sync() {
    const el = this.viewportRef().nativeElement;
    const slides = Array.from(el.children) as HTMLElement[];
    const left = el.scrollLeft;
    this.index.set(
      slides.reduce(
        (best, item, i) =>
          Math.abs(item.offsetLeft - left) <
          Math.abs((slides[best]?.offsetLeft ?? 0) - left)
            ? i
            : best,
        0,
      ),
    );
    this.atStart.set(left <= 1);
    this.atEnd.set(left + el.clientWidth >= el.scrollWidth - 1);
  }

  /** Scrolls to a slide. Also callable from a template reference: carousel.goTo(2). */
  goTo(index: number) {
    const el = this.viewportRef().nativeElement;
    const target = el.children[index] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft });
  }

  protected step(direction: 1 | -1) {
    this.goTo(
      Math.min(Math.max(this.index() + direction, 0), this.items().length - 1),
    );
  }

  protected handleKeydown(event: KeyboardEvent) {
    const directions: Record<string, 1 | -1 | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const direction = directions[event.key];
    if (direction === undefined || event.defaultPrevented) return;
    event.preventDefault();
    this.step(direction);
  }
}
