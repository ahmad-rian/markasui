import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from "@angular/core";

const root =
  "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative mt-0.5 flex size-4 shrink-0";
const box =
  "peer size-4 shrink-0 cursor-pointer appearance-none rounded-sm border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed aria-invalid:border-danger motion-reduce:transition-none";
const icon =
  "pointer-events-none absolute inset-0 size-4 text-on-primary opacity-0 peer-checked:opacity-100";
const text = "grid gap-0.5";
const labelClass = "text-sm font-medium text-ink";
const descriptionClass = "text-sm text-muted";

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, name, value, aria-label, and class move
 * to the input, so the host attributes are cleared to avoid duplicate ids and labels.
 */
@Component({
  selector: "markas-checkbox",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.value]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="root">
      <span [class]="control">
        <input
          #field
          [id]="checkboxId()"
          [class]="boxClass()"
          [checked]="on()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.name]="name() ?? null"
          [attr.value]="value() ?? null"
          [attr.aria-label]="ariaLabel() ?? null"
          [attr.aria-describedby]="
            description() ? checkboxId() + '-description' : null
          "
          type="checkbox"
          (change)="toggle(field.checked)"
        />
        <svg
          [class]="icon"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m4 8.5 2.5 2.5L12 5.5" />
        </svg>
      </span>
      @if (label() || description()) {
        <div [class]="text">
          @if (label()) {
            <label [for]="checkboxId()" [class]="labelClass">{{
              label()
            }}</label>
          }
          @if (description()) {
            <p [id]="checkboxId() + '-description'" [class]="descriptionClass">
              {{ description() }}
            </p>
          }
        </div>
      }
    </div>
  `,
})
export class Checkbox {
  readonly label = input<string>();
  readonly description = input<string>();
  readonly id = input<string>();
  readonly name = input<string>();
  readonly value = input<string>();
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Emits the new state; together with `checked` this enables `[(checked)]`. */
  readonly checkedChange = output<boolean>();

  protected readonly root = root;
  protected readonly control = control;
  protected readonly icon = icon;
  protected readonly text = text;
  protected readonly labelClass = labelClass;
  protected readonly descriptionClass = descriptionClass;
  protected readonly on = linkedSignal(() => this.checked());
  private readonly generatedId = `markas-checkbox-${nextId++}`;
  protected readonly checkboxId = computed(() => this.id() ?? this.generatedId);
  protected readonly boxClass = computed(() =>
    [box, this.userClass()].filter(Boolean).join(" "),
  );

  protected toggle(value: boolean) {
    this.on.set(value);
    this.checkedChange.emit(value);
  }
}
