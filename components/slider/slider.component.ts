import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  numberAttribute,
  output,
} from "@angular/core";

const root = "group grid gap-3 has-disabled:cursor-not-allowed";
const header = "flex items-center justify-between gap-4 text-sm";
const labelClass = "font-medium text-ink group-has-disabled:opacity-50";
const valueClass =
  "ml-auto text-muted tabular-nums group-has-disabled:text-faint";
const range =
  "h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-primary)_var(--value),var(--color-line)_var(--value))] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-surface";

const toPercent = (value: number, min: number, max: number) =>
  max > min ? ((value - min) / (max - min)) * 100 : 0;
const optionalNumber = (value: unknown) =>
  value === undefined || value === null || value === ""
    ? undefined
    : numberAttribute(value);

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, name, aria-label, and class move to the
 * input, so the host attributes are cleared.
 */
@Component({
  selector: "markas-slider",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.label]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="root">
      @if (label() || showValue()) {
        <div [class]="header">
          @if (label()) {
            <label [for]="sliderId()" [class]="labelClass">{{ label() }}</label>
          }
          @if (showValue()) {
            <span [class]="valueClass" aria-hidden="true">{{ current() }}</span>
          }
        </div>
      }
      <input
        #field
        type="range"
        [id]="sliderId()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="current()"
        [disabled]="disabled()"
        [attr.name]="name() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [style.--value]="percent()"
        [class]="rangeClass()"
        (input)="update(field.valueAsNumber)"
      />
    </div>
  `,
})
export class Slider {
  readonly label = input<string>();
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly value = input<number | undefined, unknown>(undefined, {
    transform: optionalNumber,
  });
  readonly showValue = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly id = input<string>();
  readonly name = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Emits the new number; together with `value` this enables `[(value)]`. */
  readonly valueChange = output<number>();

  protected readonly root = root;
  protected readonly header = header;
  protected readonly labelClass = labelClass;
  protected readonly valueClass = valueClass;
  private readonly generatedId = `markas-slider-${nextId++}`;
  protected readonly sliderId = computed(() => this.id() ?? this.generatedId);
  protected readonly current = linkedSignal(() => this.value() ?? this.min());
  protected readonly percent = computed(
    () => `${toPercent(this.current(), this.min(), this.max())}%`,
  );
  protected readonly rangeClass = computed(() =>
    [range, this.userClass()].filter(Boolean).join(" "),
  );

  protected update(value: number) {
    this.current.set(value);
    this.valueChange.emit(value);
  }
}
