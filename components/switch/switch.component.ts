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
  "flex items-center gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-50";
const control = "relative inline-flex shrink-0";
const track =
  "peer h-6 w-10 shrink-0 cursor-pointer appearance-none rounded-full bg-faint transition-colors duration-150 ease-out checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed motion-reduce:transition-none";
const thumb =
  "pointer-events-none absolute top-0.5 left-0.5 size-5 rounded-full bg-surface transition-transform duration-150 ease-out peer-checked:translate-x-4 motion-reduce:transition-none";
const labelClass = "text-sm font-medium text-ink";

let nextId = 0;

/**
 * Host stays out of layout (display: contents). id, name, aria-label, and class move to the
 * input, so the host attributes are cleared to avoid duplicate ids and labels.
 */
@Component({
  selector: "markas-switch",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "contents",
    "[attr.id]": "null",
    "[attr.name]": "null",
    "[attr.aria-label]": "null",
  },
  template: `
    <div [class]="root">
      <span [class]="control">
        <input
          #field
          [id]="switchId()"
          [class]="trackClass()"
          [checked]="on()"
          [disabled]="disabled()"
          [attr.name]="name() ?? null"
          [attr.aria-label]="ariaLabel() ?? null"
          type="checkbox"
          role="switch"
          (change)="toggle(field.checked)"
        />
        <span [class]="thumb" aria-hidden="true"></span>
      </span>
      @if (label()) {
        <label [for]="switchId()" [class]="labelClass">{{ label() }}</label>
      }
    </div>
  `,
})
export class Switch {
  readonly label = input<string>();
  readonly id = input<string>();
  readonly name = input<string>();
  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  readonly userClass = input("", { alias: "class" });
  /** Emits the new state; together with `checked` this enables `[(checked)]`. */
  readonly checkedChange = output<boolean>();

  protected readonly root = root;
  protected readonly control = control;
  protected readonly thumb = thumb;
  protected readonly labelClass = labelClass;
  protected readonly on = linkedSignal(() => this.checked());
  private readonly generatedId = `markas-switch-${nextId++}`;
  protected readonly switchId = computed(() => this.id() ?? this.generatedId);
  protected readonly trackClass = computed(() =>
    [track, this.userClass()].filter(Boolean).join(" "),
  );

  protected toggle(value: boolean) {
    this.on.set(value);
    this.checkedChange.emit(value);
  }
}
