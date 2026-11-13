import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  linkedSignal,
  model,
  numberAttribute,
  output,
  viewChild,
} from "@angular/core";

const root = "m-0 min-w-0 border-0 p-0";
const legend = "mb-1.5 p-0 text-sm font-medium text-ink";
const group = "flex gap-2";
const box =
  "h-12 w-10 rounded-md border border-line bg-surface text-center text-lg font-medium text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

const NON_DIGIT = /\D/g;

/** Split the value into exactly `length` characters; empty positions hold "". */
const toChars = (value: string, length: number) =>
  Array.from({ length }, (_, index) => value[index] ?? "");

const formatDigitLabel = (template: string, index: number, length: number) =>
  template
    .replace("{index}", String(index + 1))
    .replace("{length}", String(length));

/**
 * Host stays out of layout (display: contents). id and class move to the fieldset, so the
 * host id is cleared. `disabled` disables the fieldset and with it every box.
 */
@Component({
  selector: "markas-input-otp",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "contents", "[attr.id]": "null", "[attr.name]": "null" },
  template: `
    <fieldset
      [class]="rootClass()"
      [disabled]="disabled()"
      [attr.id]="id() ?? null"
    >
      @if (label()) {
        <legend [class]="legend">{{ label() }}</legend>
      }
      <div #groupEl [class]="group">
        @for (char of chars(); track $index) {
          <input
            #boxEl
            type="text"
            inputmode="numeric"
            [attr.autocomplete]="$index === 0 ? 'one-time-code' : 'off'"
            [attr.aria-label]="digitLabels()[$index]"
            [value]="char"
            [class]="box"
            (input)="handleInput($index, boxEl)"
            (keydown)="handleKeydown($index, $event)"
            (paste)="handlePaste($index, $event)"
            (focus)="boxEl.select()"
          />
        }
      </div>
      @if (name()) {
        <input type="hidden" [attr.name]="name()" [value]="joined()" />
      }
    </fieldset>
  `,
})
export class InputOTP {
  readonly length = input(6, { transform: numberAttribute });
  readonly label = input<string>();
  readonly name = input<string>();
  readonly id = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  /** aria-label of each box. {index} and {length} are replaced with numbers. */
  readonly digitLabel = input("Digit {index} of {length}");
  readonly userClass = input("", { alias: "class" });
  /** The joined code. Two-way bindable with [(value)]. */
  readonly value = model("");
  /** Emits the full code once every box is filled. */
  readonly complete = output<string>();

  protected readonly legend = legend;
  protected readonly group = group;
  protected readonly box = box;
  protected readonly rootClass = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
  /** An outside value wins, unless it equals the boxes (keeps empty positions in place). */
  protected readonly chars = linkedSignal<
    { value: string; length: number },
    string[]
  >({
    source: () => ({ value: this.value(), length: this.length() }),
    computation: (source, previous) =>
      previous &&
      previous.value.length === source.length &&
      previous.value.join("") === source.value
        ? previous.value
        : toChars(source.value, source.length),
  });
  protected readonly joined = computed(() => this.chars().join(""));
  protected readonly digitLabels = computed(() =>
    Array.from({ length: this.length() }, (_, index) =>
      formatDigitLabel(this.digitLabel(), index, this.length()),
    ),
  );
  private readonly groupRef =
    viewChild.required<ElementRef<HTMLDivElement>>("groupEl");

  private focusBox(index: number) {
    const target = this.groupRef().nativeElement.children[index];
    if (target instanceof HTMLInputElement) target.focus();
  }

  private update(next: string[]) {
    const previous = this.joined();
    this.chars.set(next);
    const nextValue = next.join("");
    if (nextValue === previous) return;
    this.value.set(nextValue);
    if (next.every(Boolean)) this.complete.emit(nextValue);
  }

  /** Fill boxes from `start` with consecutive digits, then focus the box after them. */
  private fill(start: number, digits: string) {
    this.update(
      this.chars().map((char, index) =>
        index >= start && index < start + digits.length
          ? (digits[index - start] ?? char)
          : char,
      ),
    );
    this.focusBox(Math.min(start + digits.length, this.length() - 1));
  }

  private setChar(index: number, char: string) {
    this.update(
      this.chars().map((current, i) => (i === index ? char : current)),
    );
  }

  protected handleInput(index: number, target: HTMLInputElement) {
    const digits = target.value.replace(NON_DIGIT, "");
    if (digits === "") this.setChar(index, "");
    else this.fill(index, digits);
    // Angular skips the DOM write when the bound value did not change, so sync it by hand.
    target.value = this.chars()[index] ?? "";
  }

  protected handleKeydown(index: number, event: KeyboardEvent) {
    const moves: Record<string, number | undefined> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: this.length() - 1,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      return this.focusBox(move);
    }
    if (event.key === "Delete") {
      event.preventDefault();
      return this.setChar(index, "");
    }
    if (event.key !== "Backspace") return;
    event.preventDefault();
    if (this.chars()[index] || index === 0) return this.setChar(index, "");
    this.setChar(index - 1, "");
    this.focusBox(index - 1);
  }

  protected handlePaste(index: number, event: ClipboardEvent) {
    event.preventDefault();
    const digits = (event.clipboardData?.getData("text") ?? "")
      .replace(NON_DIGIT, "")
      .slice(0, this.length());
    if (digits === "") return;
    this.fill(digits.length >= this.length() ? 0 : index, digits);
  }
}
