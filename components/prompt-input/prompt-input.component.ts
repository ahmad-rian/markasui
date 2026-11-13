import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  model,
  numberAttribute,
  output,
  signal,
  viewChild,
} from "@angular/core";

const root =
  "grid gap-1 rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 ease-out has-[textarea:focus-visible]:border-primary-line has-[textarea:focus-visible]:outline-2 has-[textarea:focus-visible]:outline-offset-2 has-[textarea:focus-visible]:outline-primary motion-reduce:transition-none";
const chips = "flex flex-wrap gap-1.5 px-1 pt-1";
const chip =
  "inline-flex h-7 max-w-full items-center gap-1.5 rounded-md border border-line bg-subtle pr-1 pl-2 text-xs font-medium text-ink";
const chipName = "max-w-40 truncate";
const chipRemove =
  "grid size-5 shrink-0 place-items-center rounded text-muted transition-colors duration-150 ease-out hover:bg-line hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary motion-reduce:transition-none";
const field =
  "block min-h-10 w-full resize-none overflow-y-auto bg-transparent px-2 py-2 text-sm leading-6 text-ink outline-none field-sizing-content placeholder:text-faint";
const bar = "flex items-center gap-1";
const iconButton =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const select =
  "h-8 max-w-40 cursor-pointer truncate rounded-full bg-transparent px-2.5 text-xs font-medium text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";
const counter =
  "ml-auto px-1.5 text-xs text-muted tabular-nums data-[state=limit]:text-danger";
const send =
  "group grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-[background-color,opacity,scale] duration-150 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-90 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";
const sendIcon =
  "col-start-1 row-start-1 size-4 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-50 group-data-[state=stop]:opacity-0 motion-reduce:transition-none";
const stopIcon =
  "col-start-1 row-start-1 size-3 scale-50 rounded-xs bg-current opacity-0 transition-[opacity,scale] duration-200 ease-out group-data-[state=stop]:scale-100 group-data-[state=stop]:opacity-100 motion-reduce:transition-none";
const icon = "size-4";
const smallIcon = "size-3";

/** Browsers without field-sizing grow the textarea by hand. */
function grow(el: HTMLTextAreaElement) {
  if (globalThis.CSS?.supports?.("field-sizing", "content")) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

const toNumber = (value: unknown) =>
  value === undefined || value === null || value === ""
    ? undefined
    : numberAttribute(value);

export type PromptInputValue = { text: string; files: File[] };
export type PromptInputModel = string | { value: string; label: string };

/**
 * Supports [(value)] for the text and [(model)] for the picker. An element with the `actions`
 * attribute (an ng-container works) adds tools to the action row. The host stays out of layout;
 * the user's class lands on the form.
 */
@Component({
  selector: "markas-prompt-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents" },
  template: `
    <form [class]="classes()" (submit)="onSubmit($event)">
      @if (files().length > 0) {
        <ul [class]="chips">
          @for (file of files(); track $index) {
            <li [class]="chip">
              <span [class]="chipName">{{ file.name }}</span>
              <button
                type="button"
                [attr.aria-label]="removeName(file)"
                [class]="chipRemove"
                (click)="remove($index)"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  [class]="smallIcon"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </li>
          }
        </ul>
      }
      <textarea
        #fieldEl
        rows="1"
        [value]="value()"
        [attr.maxlength]="maxLength() ?? null"
        [attr.aria-label]="inputLabel()"
        [attr.placeholder]="placeholderLabel()"
        [style.max-height.px]="maxHeight()"
        [class]="field"
        (input)="value.set(fieldEl.value)"
        (keydown)="onKeyDown($event)"
      ></textarea>
      <div [class]="bar">
        @if (attachments()) {
          <button
            type="button"
            [attr.aria-label]="attachLabel()"
            [class]="iconButton"
            (click)="fileEl.click()"
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
              <path
                d="m21 11-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l8.6-8.6a3.7 3.7 0 0 1 5.2 5.2l-8.6 8.6a1.8 1.8 0 0 1-2.6-2.6L15 7.6"
              />
            </svg>
          </button>
          <input
            #fileEl
            type="file"
            multiple
            hidden
            tabindex="-1"
            [attr.accept]="accept() ?? null"
            (change)="onPick(fileEl)"
          />
        }
        @if (options().length > 0) {
          <select
            [attr.aria-label]="modelLabel()"
            [class]="select"
            (change)="model.set(selectEl.value)"
            #selectEl
          >
            @for (item of options(); track item.value) {
              <option [value]="item.value" [selected]="item.value === model()">
                {{ item.label }}
              </option>
            }
          </select>
        }
        <ng-content select="[actions]" />
        <span
          [attr.data-state]="atLimit() ? 'limit' : 'ok'"
          [class]="counter"
          >{{
            maxLength() !== undefined ? value().length + "/" + maxLength() : ""
          }}</span
        >
        <button
          [attr.type]="loading() ? 'button' : 'submit'"
          [attr.aria-label]="loading() ? stopLabel() : sendLabel()"
          [attr.data-state]="loading() ? 'stop' : 'send'"
          [disabled]="!loading() && !canSend()"
          [class]="sendClass"
          (click)="onSendClick($event)"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            [class]="sendIcon"
          >
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
          <span aria-hidden="true" [class]="stopIcon"></span>
        </button>
      </div>
    </form>
  `,
})
export class PromptInput {
  /** Text in the field. */
  readonly value = model("");
  /** Turns the send button into a stop button. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** Character limit. Shows a counter next to the send button. */
  readonly maxLength = input<number | undefined, unknown>(undefined, {
    transform: toNumber,
  });
  /** Tallest the field grows before it scrolls, in px. */
  readonly maxHeight = input(200, { transform: numberAttribute });
  /** Shows the attach button. */
  readonly attachments = input(true, { transform: booleanAttribute });
  readonly accept = input<string>();
  /** Options of the small model picker on the left. */
  readonly models = input<PromptInputModel[]>([]);
  /** Picked model. */
  readonly model = model<string>();
  readonly placeholderLabel = input("Ask anything");
  readonly inputLabel = input("Message");
  readonly sendLabel = input("Send");
  readonly stopLabel = input("Stop");
  readonly attachLabel = input("Attach files");
  /** Name of each remove button. Accepts {name}. */
  readonly removeLabel = input("Remove {name}");
  readonly modelLabel = input("Model");
  readonly userClass = input("", { alias: "class" });
  /** Fires on the send button or Enter with the text and attached files. */
  readonly send = output<PromptInputValue>();
  /** Fires when the stop button is pressed while loading. */
  readonly stop = output<void>();

  protected readonly chips = chips;
  protected readonly chip = chip;
  protected readonly chipName = chipName;
  protected readonly chipRemove = chipRemove;
  protected readonly field = field;
  protected readonly bar = bar;
  protected readonly iconButton = iconButton;
  protected readonly select = select;
  protected readonly counter = counter;
  protected readonly sendClass = send;
  protected readonly sendIcon = sendIcon;
  protected readonly stopIcon = stopIcon;
  protected readonly icon = icon;
  protected readonly smallIcon = smallIcon;

  protected readonly files = signal<File[]>([]);
  protected readonly classes = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  protected readonly canSend = computed(
    () => this.value().trim() !== "" && !this.loading(),
  );
  protected readonly options = computed(() =>
    this.models().map((option) =>
      typeof option === "string" ? { value: option, label: option } : option,
    ),
  );
  protected readonly atLimit = computed(() => {
    const max = this.maxLength();
    return max !== undefined && this.value().length >= max;
  });
  private readonly fieldEl =
    viewChild.required<ElementRef<HTMLTextAreaElement>>("fieldEl");

  constructor() {
    afterRenderEffect(() => {
      this.value();
      grow(this.fieldEl().nativeElement);
    });
  }

  protected removeName(file: File) {
    return this.removeLabel().replace("{name}", file.name);
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    if (!this.canSend()) return;
    this.send.emit({ text: this.value(), files: this.files() });
    this.value.set("");
    this.files.set([]);
  }

  protected onKeyDown(event: KeyboardEvent) {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    (event.target as HTMLTextAreaElement).form?.requestSubmit();
  }

  protected onPick(input: HTMLInputElement) {
    this.files.update((list) => [...list, ...Array.from(input.files ?? [])]);
    input.value = "";
  }

  protected remove(index: number) {
    this.files.update((list) => list.filter((_, i) => i !== index));
    this.fieldEl().nativeElement.focus();
  }

  /** The button turns into submit during this click, so keep it from sending. */
  protected onSendClick(event: MouseEvent) {
    if (!this.loading()) return;
    event.preventDefault();
    this.stop.emit();
  }
}
