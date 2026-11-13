import { NgTemplateOutlet } from "@angular/common";
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  type ElementRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from "@angular/core";

const wrapper = "contents";
const trigger =
  "group relative grid w-full content-start gap-3 rounded-xl border border-line bg-surface p-3 text-left text-ink transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[state=open]:opacity-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const cardMedia = "block h-28 overflow-hidden rounded-lg bg-subtle";
const cardText = "grid gap-1 px-1 pb-1";
const cardTitle = "text-sm font-medium text-ink";
const cardDescription = "line-clamp-2 text-sm text-muted";
const expandIcon =
  "absolute top-5 right-5 inline-flex size-7 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-200 ease-out group-hover:rotate-90 motion-reduce:transition-none";
const dialogClass =
  "m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "relative";
const dialogMedia = "h-48 overflow-hidden bg-subtle";
const dialogBody = "grid gap-3 p-5";
const dialogTitle = "pr-10 text-lg font-semibold text-ink";
const dialogDescription = "text-sm text-muted";
const details = "grid gap-3 text-sm text-ink";
const footerClass = "flex flex-wrap justify-end gap-2 pt-2";
const close =
  "absolute top-3 right-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const icon = "size-4";

const OPEN_MS = 420;
const CLOSE_MS = 320;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const canAnimate = (el: HTMLElement) =>
  typeof el.animate === "function" &&
  !(
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches
  );

/** Transform that puts the dialog exactly over the card (FLIP "first" frame). */
function overCard(card: DOMRect, dialog: HTMLElement) {
  const box = dialog.getBoundingClientRect();
  return `translate(${card.left - box.left}px, ${card.top - box.top}px) scale(${card.width / box.width}, ${card.height / box.height})`;
}

/** Grow the dialog out of the card, or shrink it back into it. */
function morph(
  dialog: HTMLElement,
  panelEl: HTMLElement,
  card: DOMRect,
  opening: boolean,
) {
  const duration = opening ? OPEN_MS : CLOSE_MS;
  // Stop a running grow or shrink first so the measurement below is not mid-flight.
  dialog
    .getAnimations?.({ subtree: true })
    .forEach((animation) => animation.cancel());
  const frames: Keyframe[] = [
    { transform: overCard(card, dialog), transformOrigin: "top left" },
    { transform: "none", transformOrigin: "top left" },
  ];
  const fade: Keyframe[] = [
    { opacity: 0 },
    { opacity: 0, offset: 0.35 },
    { opacity: 1 },
  ];
  // Closing holds the last frame until the dialog is closed, so it never flashes back to full size.
  const options: KeyframeAnimationOptions = {
    duration,
    easing: EASE,
    direction: opening ? "normal" : "reverse",
    fill: opening ? "none" : "forwards",
  };
  panelEl.animate(fade, options);
  dialog.animate([{ opacity: 0 }, { opacity: 1 }], {
    ...options,
    pseudoElement: "::backdrop",
  });
  return dialog.animate(frames, options);
}

/** Media shown on the card and in the open view: `<ng-template markasCardMedia>...</ng-template>`. */
@Directive({ selector: "ng-template[markasCardMedia]" })
export class ExpandableCardMedia {
  readonly template = inject(TemplateRef);
}

let nextId = 0;

/**
 * Slots: `<ng-template markasCardMedia>` for the media, an element with the `footer` attribute
 * for the actions, everything else is the detail text of the open view.
 * Host stays out of layout; id and class move to the card button.
 */
@Component({
  selector: "markas-expandable-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <div [class]="wrapper">
      <button
        #triggerEl
        [id]="cardId()"
        type="button"
        aria-haspopup="dialog"
        [attr.aria-controls]="dialogId()"
        [attr.data-state]="open() ? 'open' : 'closed'"
        [class]="triggerClasses()"
        (click)="show()"
      >
        @if (media(); as item) {
          <span [class]="cardMedia"
            ><ng-container [ngTemplateOutlet]="item.template"
          /></span>
        }
        <span [class]="cardText">
          <span [class]="cardTitle">{{ title() }}</span>
          @if (description()) {
            <span [class]="cardDescription">{{ description() }}</span>
          }
        </span>
        <span aria-hidden="true" [class]="expandIcon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="icon"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <dialog
        #dialogEl
        [id]="dialogId()"
        [attr.aria-labelledby]="cardId() + '-title'"
        [attr.data-state]="open() ? 'open' : 'closed'"
        [class]="dialogClass"
        (close)="handleClosed()"
        (cancel)="handleCancel($event)"
        (keydown)="handleKeydown($event)"
        (click)="handleBackdrop($event)"
      >
        <div #panelEl [class]="panel">
          <button
            type="button"
            [attr.aria-label]="closeLabel()"
            [class]="close"
            (click)="hide()"
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          @if (media(); as item) {
            <div [class]="dialogMedia">
              <ng-container [ngTemplateOutlet]="item.template" />
            </div>
          }
          <div [class]="dialogBody">
            <h2 [id]="cardId() + '-title'" [class]="dialogTitle">
              {{ title() }}
            </h2>
            @if (description()) {
              <p [class]="dialogDescription">{{ description() }}</p>
            }
            <div #detailsEl [class]="details" [hidden]="!hasDetails()">
              <ng-content />
            </div>
            <div #footerEl [class]="footerClass" [hidden]="!hasFooter()">
              <ng-content select="[footer]" />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  `,
})
export class ExpandableCard {
  readonly title = input.required<string>();
  /** Short text, clamped to two lines on the card and shown in full when open. */
  readonly description = input<string>();
  readonly closeLabel = input("Close");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });

  protected readonly media = contentChild(ExpandableCardMedia);
  protected readonly wrapper = wrapper;
  protected readonly cardMedia = cardMedia;
  protected readonly cardText = cardText;
  protected readonly cardTitle = cardTitle;
  protected readonly cardDescription = cardDescription;
  protected readonly expandIcon = expandIcon;
  protected readonly dialogClass = dialogClass;
  protected readonly panel = panel;
  protected readonly dialogMedia = dialogMedia;
  protected readonly dialogBody = dialogBody;
  protected readonly dialogTitle = dialogTitle;
  protected readonly dialogDescription = dialogDescription;
  protected readonly details = details;
  protected readonly footerClass = footerClass;
  protected readonly close = close;
  protected readonly icon = icon;
  protected readonly open = signal(false);
  protected readonly hasDetails = signal(false);
  protected readonly hasFooter = signal(false);
  private readonly generatedId = `markas-expandable-card-${nextId++}`;
  protected readonly cardId = computed(() => this.id() ?? this.generatedId);
  protected readonly dialogId = computed(() => `${this.cardId()}-dialog`);
  protected readonly triggerClasses = computed(() =>
    [trigger, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly triggerEl =
    viewChild.required<ElementRef<HTMLButtonElement>>("triggerEl");
  private readonly dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>("dialogEl");
  private readonly panelEl =
    viewChild.required<ElementRef<HTMLDivElement>>("panelEl");
  private readonly detailsEl =
    viewChild.required<ElementRef<HTMLDivElement>>("detailsEl");
  private readonly footerEl =
    viewChild.required<ElementRef<HTMLDivElement>>("footerEl");
  private closing = false;

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() => {
      const details = this.detailsEl().nativeElement;
      this.hasDetails.set(
        details.childElementCount > 0 || Boolean(details.textContent?.trim()),
      );
      this.hasFooter.set(this.footerEl().nativeElement.childElementCount > 0);
    });
  }

  /** Opens the card. Also callable from a template reference: card.show(). */
  show() {
    const dialog = this.dialogEl().nativeElement;
    const card = this.triggerEl().nativeElement;
    if (dialog.open) return;
    const from = card.getBoundingClientRect();
    dialog.showModal();
    this.open.set(true);
    if (canAnimate(dialog))
      morph(dialog, this.panelEl().nativeElement, from, true);
  }

  protected hide() {
    const dialog = this.dialogEl().nativeElement;
    if (!dialog.open || this.closing) return;
    if (!canAnimate(dialog)) {
      dialog.close();
      return;
    }
    this.closing = true;
    const animation = morph(
      dialog,
      this.panelEl().nativeElement,
      this.triggerEl().nativeElement.getBoundingClientRect(),
      false,
    );
    animation.onfinish = () => dialog.close();
  }

  protected handleClosed() {
    this.dialogEl()
      .nativeElement.getAnimations?.({ subtree: true })
      .forEach((animation) => animation.cancel());
    this.closing = false;
    this.open.set(false);
    this.triggerEl().nativeElement.focus();
  }

  protected handleCancel(event: Event) {
    event.preventDefault();
    this.hide();
  }

  protected handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.preventDefault();
    this.hide();
  }

  protected handleBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) this.hide();
  }
}
