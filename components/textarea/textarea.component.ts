import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
} from "@angular/core";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const field =
  "block w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink transition-colors duration-150 ease-out placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, name, aria-label, aria-invalid,
 * aria-describedby, placeholder, and class move to the textarea, so the host attributes are cleared.
 */
@Component({
  selector: "markas-textarea",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.aria-label]": "null",
    "[attr.aria-invalid]": "null",
    "[attr.aria-describedby]": "null",
    "[attr.placeholder]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <label [for]="textareaId()" [class]="labelClass">{{ label() }}</label>
      }
      <textarea
        #field
        [id]="textareaId()"
        [rows]="rows()"
        [value]="value()"
        [disabled]="disabled()"
        [readOnly]="readonly()"
        [required]="required()"
        [attr.name]="name() ?? null"
        [attr.placeholder]="placeholder() ?? null"
        [attr.maxlength]="maxlength() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-invalid]="invalid()"
        [attr.aria-describedby]="describedBy()"
        [class]="fieldClass()"
        (input)="value.set(field.value)"
      ></textarea>
      @if (error()) {
        <p [id]="textareaId() + '-error'" [class]="errorClass">{{ error() }}</p>
      } @else if (hint()) {
        <p [id]="textareaId() + '-hint'" [class]="hintClass">{{ hint() }}</p>
      }
    </div>
  `,
})
export class Textarea {
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly id = input<string>();
  readonly rows = input(4, { transform: numberAttribute });
  readonly name = input<string>();
  readonly placeholder = input<string>();
  readonly maxlength = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value == null ? undefined : numberAttribute(value),
  });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Marks the field invalid without an error text, for example when the message sits elsewhere. */
  readonly ariaInvalid = input<boolean | "true" | "false" | undefined>(
    undefined,
    { alias: "aria-invalid" },
  );
  /** Extra description id, used when there is no error or hint. */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });
  readonly userClass = input("", { alias: "class" });
  /** Two-way bindable with [(value)]. */
  readonly value = model("");

  protected readonly wrapper = wrapper;
  protected readonly labelClass = labelClass;
  protected readonly hintClass = hintClass;
  protected readonly errorClass = errorClass;
  private readonly generatedId = `markas-textarea-${nextId++}`;
  protected readonly textareaId = computed(() => this.id() ?? this.generatedId);
  protected readonly describedBy = computed(() =>
    this.error()
      ? `${this.textareaId()}-error`
      : this.hint()
        ? `${this.textareaId()}-hint`
        : (this.ariaDescribedby() ?? null),
  );
  protected readonly invalid = computed(() =>
    this.error() ? "true" : (this.ariaInvalid()?.toString() ?? null),
  );
  protected readonly fieldClass = computed(() =>
    [field, this.userClass()].filter(Boolean).join(" "),
  );
}
