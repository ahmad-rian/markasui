import {
  afterNextRender,
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
const card =
  "inset-auto m-0 w-72 max-w-[calc(100vw-16px)] rounded-xl border border-line bg-surface p-4 text-sm text-ink shadow-overlay";

const GAP = 8;
const SHOW_DELAY = 400;
/** Short delay so the pointer can move from the trigger to the card. */
const HIDE_DELAY = 100;

let nextId = 0;

/**
 * Slots: an element with the `content` attribute (an ng-container works) fills the card,
 * everything else is the trigger. The first element of the trigger gets aria-describedby.
 * Host stays out of layout; id and class move to the root element and the card.
 */
@Component({
  selector: "markas-hover-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "(document:keydown.escape)": "hide()",
  },
  template: `<span
    #root
    [class]="rootClasses()"
    (mouseenter)="showLater()"
    (mouseleave)="hideLater()"
    (focusin)="show()"
    (focusout)="handleFocusOut($event)"
    ><ng-content /><span
      #cardEl
      [id]="cardId()"
      popover="manual"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [class]="card"
      (toggle)="handleToggle($event)"
      ><ng-content select="[content]" /></span
  ></span>`,
})
export class HoverCard {
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly card = card;
  protected readonly open = signal(false);
  private readonly generatedId = `markas-hover-card-${nextId++}`;
  protected readonly cardId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClasses = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly rootRef =
    viewChild.required<ElementRef<HTMLSpanElement>>("root");
  private readonly cardRef =
    viewChild.required<ElementRef<HTMLSpanElement>>("cardEl");
  private timer: ReturnType<typeof setTimeout> | undefined;
  private readonly update = () => this.place();
  private readonly scrollOptions = { capture: true, passive: true };

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => this.describe());
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      this.stopFollowing();
    });
  }

  protected show() {
    clearTimeout(this.timer);
    this.cardRef().nativeElement.showPopover();
  }

  protected showLater() {
    clearTimeout(this.timer);
    if (this.open()) return;
    this.timer = setTimeout(() => this.show(), SHOW_DELAY);
  }

  protected hide() {
    clearTimeout(this.timer);
    this.cardRef().nativeElement.hidePopover();
  }

  protected hideLater() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), HIDE_DELAY);
  }

  // Focus that moves into the card (a link in the card, for example) keeps it open.
  protected handleFocusOut(event: FocusEvent) {
    if (
      !this.rootRef().nativeElement.contains(event.relatedTarget as Node | null)
    )
      this.hide();
  }

  protected handleToggle(event: Event) {
    this.stopFollowing();
    const isOpen = (event as ToggleEvent).newState === "open";
    this.open.set(isOpen);
    if (!isOpen) return;
    this.place();
    // Re-place while open when the page scrolls or the window resizes.
    window.addEventListener("scroll", this.update, this.scrollOptions);
    window.addEventListener("resize", this.update, { passive: true });
  }

  private describe() {
    const id = this.cardId();
    const trigger = this.rootRef().nativeElement.firstElementChild;
    const described = trigger?.getAttribute("aria-describedby") ?? "";
    if (
      trigger &&
      trigger !== this.cardRef().nativeElement &&
      !described.split(" ").includes(id)
    )
      trigger.setAttribute(
        "aria-describedby",
        [described, id].filter(Boolean).join(" "),
      );
  }

  /** Place the card below the center of the trigger, flip above when it does not fit. */
  private place() {
    const target = this.cardRef().nativeElement;
    const anchor = this.rootRef().nativeElement.getBoundingClientRect();
    const { width, height } = target.getBoundingClientRect();
    const above = anchor.top - GAP - height;
    const below = anchor.bottom + GAP;
    const onTop = below + height > window.innerHeight && above >= 0;
    const left = Math.max(
      GAP,
      Math.min(
        anchor.left + anchor.width / 2 - width / 2,
        window.innerWidth - width - GAP,
      ),
    );
    target.style.top = `${onTop ? above : below}px`;
    target.style.left = `${left}px`;
  }

  private stopFollowing() {
    window.removeEventListener("scroll", this.update, this.scrollOptions);
    window.removeEventListener("resize", this.update);
  }
}
