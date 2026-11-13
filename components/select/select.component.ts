import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  type ElementRef,
  input,
  model,
  viewChild,
} from "@angular/core";

const wrapper = "grid gap-1.5";
const labelClass = "text-sm font-medium text-ink";
const control = "relative";
const field =
  "h-10 w-full cursor-pointer appearance-none rounded-md border border-line bg-surface pr-9 pl-3 text-sm text-ink transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger motion-reduce:transition-none";
const icon =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted";
const hintClass = "text-sm text-muted";
const errorClass = "text-sm text-danger";

let nextId = 0;

/**
 * Projected option and optgroup elements fill the native select. Host stays out of layout;
 * id, name, aria-label, and class move to the select, so the host attributes are cleared.
 */
@Component({
  selector: "markas-select",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <label [for]="selectId()" [class]="labelClass">{{ label() }}</label>
      }
      <div [class]="control">
        <select
          #select
          [id]="selectId()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.name]="name() ?? null"
          [attr.aria-label]="ariaLabel() ?? null"
          [attr.aria-invalid]="error() ? 'true' : null"
          [attr.aria-describedby]="describedBy()"
          [class]="fieldClass()"
          (change)="value.set(select.value)"
        >
          <ng-content />
        </select>
        <svg
          [class]="icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      @if (error()) {
        <p [id]="selectId() + '-error'" [class]="errorClass">{{ error() }}</p>
      } @else if (hint()) {
        <p [id]="selectId() + '-hint'" [class]="hintClass">{{ hint() }}</p>
      }
    </div>
  `,
})
export class Select {
  readonly label = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly id = input<string>();
  readonly name = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Two-way bindable with [(value)]. Without it the option marked selected (or the first) wins. */
  readonly value = model<string>();

  protected readonly wrapper = wrapper;
  protected readonly labelClass = labelClass;
  protected readonly control = control;
  protected readonly icon = icon;
  protected readonly hintClass = hintClass;
  protected readonly errorClass = errorClass;
  private readonly generatedId = `markas-select-${nextId++}`;
  protected readonly selectId = computed(() => this.id() ?? this.generatedId);
  protected readonly describedBy = computed(() =>
    this.error()
      ? `${this.selectId()}-error`
      : this.hint()
        ? `${this.selectId()}-hint`
        : null,
  );
  protected readonly fieldClass = computed(() =>
    [field, this.userClass()].filter(Boolean).join(" "),
  );
  private readonly select =
    viewChild.required<ElementRef<HTMLSelectElement>>("select");

  constructor() {
    // Projected options exist only after render, so the value is applied afterwards.
    afterRenderEffect(() => {
      const value = this.value();
      if (value !== undefined) this.select().nativeElement.value = value;
    });
  }
}
