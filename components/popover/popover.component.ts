import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  type ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

const root = "inline-block";
const triggerClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium whitespace-nowrap text-ink transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:bg-subtle motion-reduce:transition-none";
const panel =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

const GAP = 4;
const FOCUSABLE =
  "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])";

type Side = "top" | "bottom";
type Align = "start" | "center" | "end";

let nextId = 0;

/**
 * Slots: an element with the `trigger` attribute (an ng-container works) replaces the label
 * inside the trigger button, everything else is the panel content.
 * Host stays out of layout; id and class move to the root element and the panel.
 */
@Component({
  selector: "markas-popover",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null" },
  template: `
    <div [class]="rootClasses()">
      <button
        #trigger
        type="button"
        [id]="panelId() + '-trigger'"
        [attr.popovertarget]="panelId()"
        aria-haspopup="dialog"
        [attr.aria-expanded]="open() ? 'true' : 'false'"
        [attr.aria-controls]="panelId()"
        [attr.data-state]="dataState()"
        [class]="triggerClass"
      >
        <ng-content select="[trigger]">{{ label() }}</ng-content>
      </button>
      <div
        #panelEl
        [id]="panelId()"
        popover="auto"
        role="dialog"
        [attr.aria-labelledby]="panelId() + '-trigger'"
        [attr.data-state]="dataState()"
        [class]="panel"
        (beforetoggle)="handleBeforeToggle($event)"
        (toggle)="handleToggle($event)"
        (keydown)="handleKeydown($event)"
      >
        <ng-content />
      </div>
    </div>
  `,
})
export class Popover {
  /** Text of the trigger button. */
  readonly label = input("Open");
  readonly side = input<Side>("bottom");
  readonly align = input<Align>("start");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly triggerClass = triggerClass;
  protected readonly panel = panel;
  protected readonly open = signal(false);
  protected readonly dataState = computed(() =>
    this.open() ? "open" : "closed",
  );
  private readonly generatedId = `markas-popover-${nextId++}`;
  protected readonly panelId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly triggerRef =
    viewChild.required<ElementRef<HTMLButtonElement>>("trigger");
  private readonly panelRef =
    viewChild.required<ElementRef<HTMLDivElement>>("panelEl");
  private readonly update = () => this.place();
  private readonly scrollOptions = { capture: true, passive: true };

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopFollowing());
  }

  /** Place the panel on the chosen side with the chosen alignment, flip when it does not fit. */
  private place() {
    const target = this.panelRef().nativeElement;
    const anchor = this.triggerRef().nativeElement.getBoundingClientRect();
    const { width, height } = target.getBoundingClientRect();
    const above = anchor.top - GAP - height;
    const below = anchor.bottom + GAP;
    const fitsAbove = above >= 0;
    const fitsBelow = below + height <= window.innerHeight;
    const onTop =
      this.side() === "top" ? fitsAbove || !fitsBelow : !fitsBelow && fitsAbove;
    const starts: Record<Align, number> = {
      start: anchor.left,
      center: anchor.left + anchor.width / 2 - width / 2,
      end: anchor.right - width,
    };
    const start = starts[this.align()] ?? starts.start;
    const left = Math.max(
      GAP,
      Math.min(start, window.innerWidth - width - GAP),
    );
    target.style.top = `${onTop ? above : below}px`;
    target.style.left = `${left}px`;
  }

  private stopFollowing() {
    window.removeEventListener("scroll", this.update, this.scrollOptions);
    window.removeEventListener("resize", this.update);
  }

  // beforetoggle runs synchronously, so the state is current for the next click.
  protected handleBeforeToggle(event: Event) {
    this.open.set((event as ToggleEvent).newState === "open");
  }

  protected handleToggle(event: Event) {
    this.stopFollowing();
    const target = this.panelRef().nativeElement;
    if ((event as ToggleEvent).newState === "open") {
      this.place();
      // Re-place while open when the page scrolls or the window resizes.
      window.addEventListener("scroll", this.update, this.scrollOptions);
      window.addEventListener("resize", this.update, { passive: true });
      target.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      return;
    }
    // Focus returns to the trigger, unless the user already moved it outside the panel.
    const active = document.activeElement;
    if (active === document.body || target.contains(active))
      this.triggerRef().nativeElement.focus();
  }

  protected handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    this.panelRef().nativeElement.hidePopover();
    this.triggerRef().nativeElement.focus();
  }
}
