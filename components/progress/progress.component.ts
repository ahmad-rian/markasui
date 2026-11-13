import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from "@angular/core";

const wrapper = "grid gap-1.5";
const header = "flex items-center justify-between gap-4 text-sm";
const labelClass = "font-medium text-ink";
const valueClass = "text-muted tabular-nums";
const bar =
  "block h-2 w-full appearance-none overflow-hidden rounded-full border-0 bg-subtle [&::-webkit-progress-bar]:bg-subtle [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-[width] [&::-webkit-progress-value]:duration-200 [&::-webkit-progress-value]:ease-out [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary indeterminate:animate-pulse indeterminate:bg-primary/30 indeterminate:[&::-webkit-progress-bar]:bg-primary/30 motion-reduce:animate-none motion-reduce:[&::-webkit-progress-value]:transition-none";

const percentOf = (value: number, max: number): number =>
  Math.min(100, Math.max(0, Math.round((value / max) * 100)));

/** Empty (null or undefined) stays null, so the bar is indeterminate. */
const optionalNumber = (value: unknown): number | null =>
  value === null || value === undefined ? null : numberAttribute(value);

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, aria-label, and class move to the
 * progress element, so the host attributes are cleared to avoid duplicate ids and labels.
 */
@Component({
  selector: "markas-progress",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="wrapper">
      @if (label()) {
        <div [class]="header">
          <label [for]="progressId()" [class]="labelClass">{{ label() }}</label>
          @if (percent() !== null) {
            <span [class]="valueClass">{{ percent() }}%</span>
          }
        </div>
      }
      <progress
        [id]="progressId()"
        [attr.value]="value()"
        [attr.max]="max()"
        [attr.aria-label]="ariaLabel() ?? null"
        [class]="barClasses()"
      ></progress>
    </div>
  `,
})
export class Progress {
  /** Empty (null) shows an indeterminate bar. */
  readonly value = input<number | null, unknown>(null, {
    transform: optionalNumber,
  });
  readonly max = input(100, { transform: numberAttribute });
  readonly label = input<string>();
  readonly id = input<string>();
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });

  protected readonly wrapper = wrapper;
  protected readonly header = header;
  protected readonly labelClass = labelClass;
  protected readonly valueClass = valueClass;
  private readonly generatedId = `markas-progress-${nextId++}`;
  protected readonly progressId = computed(() => this.id() ?? this.generatedId);
  protected readonly percent = computed(() => {
    const value = this.value();
    return value === null ? null : percentOf(value, this.max());
  });
  protected readonly barClasses = computed(() =>
    [bar, this.userClass()].filter(Boolean).join(" "),
  );
}
