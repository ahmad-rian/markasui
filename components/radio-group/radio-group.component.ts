import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from "@angular/core";

const root = "min-w-0";
const legendClass = "mb-3 text-sm font-medium text-ink";
const orientations = {
  vertical: "grid gap-3",
  horizontal: "flex flex-wrap gap-x-6 gap-y-3",
};
const item =
  "flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative mt-0.5 flex size-4 shrink-0";
const radio =
  "peer size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-faint bg-surface transition-colors duration-150 ease-out checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
const dot =
  "pointer-events-none absolute inset-1 rounded-full bg-on-primary opacity-0 peer-checked:opacity-100";
const text = "grid gap-0.5";
const labelClass = "text-sm font-medium text-ink";
const descriptionClass = "text-sm text-muted";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
};

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, disabled, and class move to the fieldset,
 * so the host attributes are cleared.
 */
@Component({
  selector: "markas-radio-group",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.label]": "null",
    "[attr.disabled]": "null",
  },
  template: `
    <fieldset [id]="groupId()" [class]="rootClass()" [disabled]="disabled()">
      @if (label()) {
        <legend [class]="legendClass">{{ label() }}</legend>
      }
      <div [class]="orientations[orientation()]">
        @for (option of options(); track option.value) {
          @let optionId = groupId() + "-" + option.value;
          <div [class]="item">
            <span [class]="control">
              <input
                type="radio"
                [id]="optionId"
                [name]="name()"
                [value]="option.value"
                [checked]="option.value === value()"
                [attr.aria-describedby]="
                  option.description ? optionId + '-description' : null
                "
                [class]="radio"
                (change)="value.set(option.value)"
              />
              <span [class]="dot" aria-hidden="true"></span>
            </span>
            <div [class]="text">
              <label [for]="optionId" [class]="labelClass">{{
                option.label
              }}</label>
              @if (option.description) {
                <p [id]="optionId + '-description'" [class]="descriptionClass">
                  {{ option.description }}
                </p>
              }
            </div>
          </div>
        }
      </div>
    </fieldset>
  `,
})
export class RadioGroup {
  readonly name = input.required<string>();
  readonly options = input.required<RadioOption[]>();
  readonly label = input<string>();
  readonly orientation = input<keyof typeof orientations>("vertical");
  readonly id = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly userClass = input("", { alias: "class" });
  /** Selected option, two-way bindable with [(value)]. */
  readonly value = model<string>();

  protected readonly legendClass = legendClass;
  protected readonly orientations = orientations;
  protected readonly item = item;
  protected readonly control = control;
  protected readonly radio = radio;
  protected readonly dot = dot;
  protected readonly text = text;
  protected readonly labelClass = labelClass;
  protected readonly descriptionClass = descriptionClass;
  private readonly generatedId = `markas-radio-group-${nextId++}`;
  protected readonly groupId = computed(() => this.id() ?? this.generatedId);
  protected readonly rootClass = computed(() =>
    [root, this.userClass()].filter(Boolean).join(" "),
  );
}
