import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
} from "@angular/core";

export type DockItem =
  | {
      separator?: false;
      label: string;
      /** Path data (the d attribute) for a 24x24 stroked icon. */
      icon: string;
      value?: string;
      href?: string;
      /** Shows the dot under the item, like an open app. */
      active?: boolean;
    }
  | { separator: true };

const root =
  "relative inline-flex h-[60px] max-w-full min-w-0 items-end gap-2 rounded-2xl border border-line bg-surface/80 px-2.5 pb-2.5 shadow-overlay backdrop-blur-md";
const itemWrap =
  "relative h-10 w-[calc(2.5rem*var(--dock-scale,1))] transition-[width] duration-150 ease-out motion-reduce:transition-none";
const itemClass =
  "group/dock absolute bottom-0 left-0 grid aspect-square w-full place-items-center rounded-xl border border-line bg-linear-to-b from-surface to-subtle text-ink transition-colors duration-150 ease-out hover:to-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const iconClass = "size-[55%]";
const tooltip =
  "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-primary px-2 py-1 text-xs font-medium whitespace-nowrap text-on-primary opacity-0 shadow-overlay transition-[opacity,translate] duration-150 ease-out group-hover/dock:translate-y-0 group-hover/dock:opacity-100 group-focus-visible/dock:translate-y-0 group-focus-visible/dock:opacity-100 motion-reduce:transition-none";
const dot =
  "absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-ink";
const separator = "mx-0.5 mb-1 h-8 w-px shrink-0 bg-line";

/** Pointer distance in px over which neighbours still grow, and the launch bounce. */
const RANGE = 140;
const BOUNCE = [
  { transform: "none" },
  { transform: "translateY(-12px)" },
  { transform: "none" },
];
const BOUNCE_TIMING = { duration: 450, easing: "cubic-bezier(0.3, 0, 0.3, 1)" };

/** Href with a scheme other than http, https, mailto, or tel (such as javascript:) becomes "#". */
const safeHref = (href: string) =>
  /^(?!https?:|mailto:|tel:)[a-z][\w+.-]*:/i.test(href.replace(/[\0- ]/g, ""))
    ? "#"
    : href;

const still = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const centerOf = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return rect.left + rect.width / 2;
};

/** Host stays out of layout; class moves to the toolbar. */
@Component({
  selector: "markas-dock",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents" },
  template: `
    <ng-template #content let-item>
      <svg
        [class]="iconClass"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path [attr.d]="item.icon" />
      </svg>
      <span [class]="tooltip">{{ item.label }}</span>
    </ng-template>
    <div
      role="toolbar"
      [attr.aria-label]="dockLabel()"
      aria-orientation="horizontal"
      [class]="rootClasses()"
      (keydown)="handleKeydown($event)"
      (focusin)="handleFocusin($event)"
      (focusout)="handleFocusout($event)"
      (pointermove)="magnify($event.clientX)"
      (pointerleave)="handlePointerleave()"
    >
      @for (item of items(); track $index) {
        @if (item.separator) {
          <div
            role="separator"
            aria-orientation="vertical"
            [class]="separator"
          ></div>
        } @else {
          <div data-dock-item="" [class]="itemWrap">
            @if (item.href) {
              <a
                [attr.href]="safeHref(item.href)"
                [tabIndex]="positions()[$index] === focusIndex() ? 0 : -1"
                [attr.aria-current]="item.active ? 'true' : null"
                [class]="itemClass"
                (click)="launch($event, item.value ?? item.label)"
                ><ng-container
                  [ngTemplateOutlet]="content"
                  [ngTemplateOutletContext]="{ $implicit: item }"
              /></a>
            } @else {
              <button
                type="button"
                [tabIndex]="positions()[$index] === focusIndex() ? 0 : -1"
                [attr.aria-current]="item.active ? 'true' : null"
                [class]="itemClass"
                (click)="launch($event, item.value ?? item.label)"
              >
                <ng-container
                  [ngTemplateOutlet]="content"
                  [ngTemplateOutletContext]="{ $implicit: item }"
                />
              </button>
            }
            @if (item.active) {
              <span aria-hidden="true" [class]="dot"></span>
            }
          </div>
        }
      }
    </div>
  `,
})
export class Dock {
  readonly items = input.required<DockItem[]>();
  /** How large the item under the pointer or focus grows. 1 turns it off. */
  readonly magnification = input(1.6, { transform: numberAttribute });
  readonly dockLabel = input("Dock");
  readonly userClass = input("", { alias: "class" });
  readonly itemSelect = output<string>();

  protected readonly itemWrap = itemWrap;
  protected readonly itemClass = itemClass;
  protected readonly iconClass = iconClass;
  protected readonly tooltip = tooltip;
  protected readonly dot = dot;
  protected readonly separator = separator;
  protected readonly safeHref = safeHref;
  protected readonly focusIndex = signal(0);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  /** Position of each item among the focusable ones, -1 for separators. */
  protected readonly positions = computed(() =>
    this.items().reduce<number[]>(
      (list, item) => [
        ...list,
        item.separator ? -1 : list.filter((position) => position >= 0).length,
      ],
      [],
    ),
  );
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;

  private controls() {
    return Array.from(
      this.host.querySelectorAll<HTMLElement>(
        "[data-dock-item] > :first-child",
      ),
    );
  }

  /** Grow every item by its distance to x with a cosine falloff. x null resets the dock. */
  protected magnify(x: number | null) {
    const magnification = this.magnification();
    const off = x === null || still();
    for (const item of this.host.querySelectorAll<HTMLElement>(
      "[data-dock-item]",
    )) {
      const rect = item.getBoundingClientRect();
      const distance = off ? RANGE : Math.abs(x - rect.left - rect.width / 2);
      const scale =
        distance >= RANGE
          ? 1
          : 1 +
            ((magnification - 1) *
              (1 + Math.cos((Math.PI * distance) / RANGE))) /
              2;
      item.style.setProperty("--dock-scale", String(scale));
    }
  }

  protected handleKeydown(event: KeyboardEvent) {
    const all = this.controls();
    const index = all.indexOf(event.target as HTMLElement);
    const targets: Record<string, number> = {
      ArrowRight: (index + 1) % all.length,
      ArrowLeft: (index - 1 + all.length) % all.length,
      Home: 0,
      End: all.length - 1,
    };
    const target = targets[event.key];
    if (index < 0 || target === undefined) return;
    event.preventDefault();
    all[target]?.focus();
  }

  protected handleFocusin(event: FocusEvent) {
    const index = this.controls().indexOf(event.target as HTMLElement);
    if (index < 0) return;
    this.focusIndex.set(index);
    this.magnify(centerOf(event.target as Element));
  }

  protected handleFocusout(event: FocusEvent) {
    const toolbar = event.currentTarget as HTMLElement;
    if (!toolbar.contains(event.relatedTarget as Node | null))
      this.magnify(null);
  }

  protected handlePointerleave() {
    const focused = this.host.contains(document.activeElement);
    this.magnify(focused ? centerOf(document.activeElement!) : null);
  }

  protected launch(event: MouseEvent, value: string) {
    if (!still())
      (event.currentTarget as HTMLElement).animate?.(BOUNCE, BOUNCE_TIMING);
    this.itemSelect.emit(value);
  }
}
