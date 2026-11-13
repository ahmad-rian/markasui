import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";

const dialogClass =
  "fixed inset-y-0 m-0 h-dvh max-h-dvh w-full max-w-sm border-line bg-surface p-0 text-ink shadow-overlay transition-transform duration-200 ease-out backdrop:bg-ink/40 motion-reduce:transition-none";
const sides = {
  right: "right-0 left-auto border-l starting:open:translate-x-full",
  left: "right-auto left-0 border-r starting:open:-translate-x-full",
};
const panel = "flex h-full flex-col gap-4 p-6";
const header = "flex items-start justify-between gap-4";
const titleClass = "text-lg font-semibold text-ink";
const body = "flex-1 overflow-y-auto text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const close =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

export type DrawerSide = keyof typeof sides;

let nextId = 0;

/**
 * Slots: an element with the `trigger` attribute opens the drawer, an element with the `footer`
 * attribute (an ng-container works) fills the action row, everything else is the body.
 * Host stays out of layout; id, title, and class move to the dialog.
 */
@Component({
  selector: "markas-drawer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <div class="contents" (click)="show()">
      <ng-content select="[trigger]" />
    </div>
    <dialog
      #dialog
      [id]="dialogId()"
      [attr.aria-labelledby]="dialogId() + '-title'"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [class]="dialogClasses()"
      (close)="handleClose()"
      (click)="handleClick($event)"
    >
      <div [class]="panel">
        <div [class]="header">
          <h2 [id]="dialogId() + '-title'" [class]="titleClass">
            {{ title() }}
          </h2>
          <form method="dialog">
            <button
              type="submit"
              [class]="close"
              [attr.aria-label]="closeLabel()"
            >
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </form>
        </div>
        <div [class]="body"><ng-content /></div>
        <form
          #footer
          method="dialog"
          [class]="footerClass"
          [hidden]="!hasFooter()"
        >
          <ng-content select="[footer]" />
        </form>
      </div>
    </dialog>
  `,
})
export class Drawer {
  readonly title = input.required<string>();
  readonly side = input<DrawerSide>("right");
  /** Accessible label of the close button. */
  readonly closeLabel = input("Close");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  readonly closed = output<void>();

  protected readonly panel = panel;
  protected readonly header = header;
  protected readonly titleClass = titleClass;
  protected readonly body = body;
  protected readonly footerClass = footerClass;
  protected readonly close = close;
  protected readonly open = signal(false);
  protected readonly hasFooter = signal(false);
  private readonly generatedId = `markas-drawer-${nextId++}`;
  protected readonly dialogId = computed(() => this.id() ?? this.generatedId);
  protected readonly dialogClasses = computed(() =>
    [dialogClass, sides[this.side()], this.userClass()]
      .filter(Boolean)
      .join(" "),
  );
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>("dialog");
  private readonly footer =
    viewChild.required<ElementRef<HTMLFormElement>>("footer");

  constructor() {
    // Projected content is only known after the first render.
    afterNextRender(() =>
      this.hasFooter.set(this.footer().nativeElement.childElementCount > 0),
    );
  }

  /** Opens the drawer. Also callable from a template reference: drawer.show(). */
  show() {
    this.dialog().nativeElement.showModal();
    this.open.set(true);
  }

  protected handleClose() {
    this.open.set(false);
    this.closed.emit();
  }

  protected handleClick(event: MouseEvent) {
    // A click on the dialog itself (not its content) is a click on the backdrop.
    if (event.target === event.currentTarget)
      this.dialog().nativeElement.close();
  }
}
