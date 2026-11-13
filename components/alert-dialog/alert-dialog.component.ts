import {
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
  "m-auto w-full max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40";
const panel = "grid gap-4 p-6";
const titleClass = "text-lg font-semibold text-ink";
const body = "text-sm text-muted";
const footerClass = "flex flex-wrap justify-end gap-2";
const button =
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const cancelClass = "border border-line bg-surface text-ink hover:bg-subtle";
const actionTones = {
  default: "bg-primary text-on-primary hover:bg-primary-strong",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};

const ACTION = "action";
const CANCEL = "cancel";

export type AlertDialogVariant = keyof typeof actionTones;

let nextId = 0;

/**
 * Slots: an element with the `trigger` attribute opens the dialog, everything else is the
 * explanation. Host stays out of layout; id, title, and class move to the dialog.
 */
@Component({
  selector: "markas-alert-dialog",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null", "[attr.title]": "null" },
  template: `
    <div class="contents" (click)="show()">
      <ng-content select="[trigger]" />
    </div>
    <dialog
      #dialog
      [id]="dialogId()"
      role="alertdialog"
      [attr.aria-labelledby]="dialogId() + '-title'"
      [attr.aria-describedby]="dialogId() + '-description'"
      [attr.data-state]="open() ? 'open' : 'closed'"
      [class]="dialogClasses()"
      (close)="handleClose()"
    >
      <div [class]="panel">
        <h2 [id]="dialogId() + '-title'" [class]="titleClass">
          {{ title() }}
        </h2>
        <div [id]="dialogId() + '-description'" [class]="body">
          <ng-content />
        </div>
        <form method="dialog" [class]="footerClass">
          <button
            #cancelButton
            type="submit"
            [value]="CANCEL"
            [class]="cancelClasses"
          >
            {{ cancelLabel() }}
          </button>
          <button type="submit" [value]="ACTION" [class]="actionClasses()">
            {{ actionLabel() }}
          </button>
        </form>
      </div>
    </dialog>
  `,
})
export class AlertDialog {
  readonly title = input.required<string>();
  /** Color of the action button. Use danger for destructive or irreversible actions. */
  readonly variant = input<AlertDialogVariant>("default");
  readonly cancelLabel = input("Cancel");
  readonly actionLabel = input("Continue");
  readonly id = input<string>();
  readonly userClass = input("", { alias: "class" });
  /** Emits when the action button is chosen. */
  readonly action = output<void>();
  /** Emits when the dialog closes through the cancel button or Escape. */
  readonly cancelled = output<void>();

  protected readonly ACTION = ACTION;
  protected readonly CANCEL = CANCEL;
  protected readonly panel = panel;
  protected readonly titleClass = titleClass;
  protected readonly body = body;
  protected readonly footerClass = footerClass;
  protected readonly cancelClasses = `${button} ${cancelClass}`;
  protected readonly open = signal(false);
  private readonly generatedId = `markas-alert-dialog-${nextId++}`;
  protected readonly dialogId = computed(() => this.id() ?? this.generatedId);
  protected readonly dialogClasses = computed(() =>
    [dialogClass, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly actionClasses = computed(
    () => `${button} ${actionTones[this.variant()] ?? actionTones.default}`,
  );
  private readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>("dialog");
  private readonly cancelButton =
    viewChild.required<ElementRef<HTMLButtonElement>>("cancelButton");

  /** Opens the dialog. Also callable from a template reference: dialog.show(). */
  show() {
    const dialog = this.dialog().nativeElement;
    dialog.returnValue = "";
    dialog.showModal();
    this.open.set(true);
    this.cancelButton().nativeElement.focus();
  }

  // Anything but the action button (cancel button, Escape, close() from code) counts as cancel.
  protected handleClose() {
    const dialog = this.dialog().nativeElement;
    this.open.set(false);
    if (dialog.returnValue === ACTION) return this.action.emit();
    dialog.returnValue = CANCEL;
    this.cancelled.emit();
  }
}
