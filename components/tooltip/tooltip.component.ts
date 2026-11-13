import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

const root = "inline-flex";
const tooltip =
  "inset-auto m-0 max-w-64 rounded-md bg-ink px-2 py-1 text-xs font-medium text-canvas shadow-overlay";

const GAP = 6;
const SHOW_DELAY = 300;

export type TooltipSide = "top" | "bottom";

/** Places the tooltip centered on the trigger on the chosen side, flipping when it does not fit. */
function placeTooltip(
  trigger: HTMLElement,
  tip: HTMLElement,
  side: TooltipSide,
) {
  const anchor = trigger.getBoundingClientRect();
  const { width, height } = tip.getBoundingClientRect();
  const above = anchor.top - GAP - height;
  const below = anchor.bottom + GAP;
  const fitsAbove = above >= 0;
  const fitsBelow = below + height <= window.innerHeight;
  const onTop =
    side === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
  const left = Math.max(
    GAP,
    Math.min(
      anchor.left + anchor.width / 2 - width / 2,
      window.innerWidth - width - GAP,
    ),
  );
  tip.style.top = `${onTop ? above : below}px`;
  tip.style.left = `${left}px`;
}

/** Re-runs placement on scroll and resize. Returns the cleanup function. */
function followViewport(update: () => void) {
  const scrollOptions = { capture: true, passive: true };
  window.addEventListener("scroll", update, scrollOptions);
  window.addEventListener("resize", update, { passive: true });
  return () => {
    window.removeEventListener("scroll", update, scrollOptions);
    window.removeEventListener("resize", update);
  };
}

let nextId = 0;

/**
 * The host is the inline-flex wrapper (the span in other frameworks), so class and other
 * attributes stay on it. The first projected element is the trigger; id moves to the tooltip.
 */
@Component({
  selector: "markas-tooltip",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: root,
    "[attr.id]": "null",
    "(mouseenter)": "showLater()",
    "(mouseleave)": "hide()",
    "(focusin)": "show()",
    "(focusout)": "hide()",
    "(document:keydown.escape)": "hide()",
  },
  template: `<ng-content /><span
      #tip
      [id]="tooltipId()"
      popover="manual"
      role="tooltip"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [class]="tooltip"
      (toggle)="handleToggle($event)"
      >{{ content() }}</span
    >`,
})
export class Tooltip {
  readonly content = input.required<string>();
  readonly side = input<TooltipSide>("top");
  readonly id = input<string>();

  protected readonly tooltip = tooltip;
  protected readonly open = signal(false);
  private readonly generatedId = `markas-tooltip-${nextId++}`;
  protected readonly tooltipId = computed(() => this.id() ?? this.generatedId);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly tip = viewChild.required<ElementRef<HTMLElement>>("tip");
  private timer: ReturnType<typeof setTimeout> | undefined;
  private unfollow: (() => void) | undefined;

  constructor() {
    afterNextRender(() => {
      const tip = this.tip().nativeElement;
      const trigger = this.host.nativeElement.firstElementChild;
      const id = this.tooltipId();
      const described = trigger?.getAttribute("aria-describedby") ?? "";
      if (trigger && trigger !== tip && !described.split(" ").includes(id))
        trigger.setAttribute(
          "aria-describedby",
          [described, id].filter(Boolean).join(" "),
        );
    });
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      this.unfollow?.();
    });
  }

  protected show() {
    clearTimeout(this.timer);
    this.tip().nativeElement.showPopover();
  }

  protected showLater() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show(), SHOW_DELAY);
  }

  protected hide() {
    clearTimeout(this.timer);
    this.tip().nativeElement.hidePopover();
  }

  private place() {
    placeTooltip(
      this.host.nativeElement,
      this.tip().nativeElement,
      this.side(),
    );
  }

  protected handleToggle(event: Event) {
    this.unfollow?.();
    this.unfollow = undefined;
    const isOpen = (event as ToggleEvent).newState === "open";
    this.open.set(isOpen);
    if (!isOpen) return;
    this.place();
    this.unfollow = followViewport(() => this.place());
  }
}
