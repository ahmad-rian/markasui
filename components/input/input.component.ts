import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from "@angular/core";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, name, aria-label, placeholder, and class
 * move to the input, so the host attributes are cleared.
 */
@Component({
  selector: "markas-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.aria-label]": "null",
    "[attr.placeholder]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <label [for]="inputId()" [class]="labelClass">{{ label() }}</label>
      }
      <input
        #field
        [id]="inputId()"
        [type]="type()"
        [value]="value()"
        [disabled]="disabled()"
        [readOnly]="readonly()"
        [required]="required()"
        [attr.name]="name() ?? null"
        [attr.placeholder]="placeholder() ?? null"
        [attr.autocomplete]="autocomplete() ?? null"
        [attr.inputmode]="inputmode() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="describedBy()"
        [class]="fieldClass()"
        (input)="value.set(field.value)"
      />
      @if (error()) {
        <p [id]="inputId() + '-error'" [class]="errorClass">{{ error() }}</p>
      } @else if (hint()) {
        <p [id]="inputId() + '-hint'" [class]="hintClass">{{ hint() }}</p>
      }
    </div>
  `,
})
export class Input {
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly id = input<string>();
  readonly type = input("text");
  readonly name = input<string>();
  readonly placeholder = input<string>();
  readonly autocomplete = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  /** Virtual keyboard hint, for example decimal or numeric. */
  readonly inputmode = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Two-way bindable with [(value)]. */
  readonly value = model("");

  protected readonly wrapper = wrapper;
  protected readonly labelClass = labelClass;
  protected readonly hintClass = hintClass;
  protected readonly errorClass = errorClass;
  private readonly generatedId = `markas-input-${nextId++}`;
  protected readonly inputId = computed(() => this.id() ?? this.generatedId);
  protected readonly describedBy = computed(() =>
    this.error()
      ? `${this.inputId()}-error`
      : this.hint()
        ? `${this.inputId()}-hint`
        : null,
  );
  protected readonly fieldClass = computed(() =>
    [field, this.userClass()].filter(Boolean).join(" "),
  );
}
