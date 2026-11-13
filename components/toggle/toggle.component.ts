import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from "@angular/core";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-subtle data-[state=on]:text-ink motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";
const variants = {
  default: "bg-transparent",
  outline: "border border-line bg-surface",
};
const sizes = {
  sm: "h-8 min-w-8 px-2",
  md: "h-9 min-w-9 px-2.5",
  lg: "h-10 min-w-10 px-3",
};

export type ToggleVariant = keyof typeof variants;
export type ToggleSize = keyof typeof sizes;

/**
 * Attribute selector on the native button: disabled, aria-label, and the user's class stay on
 * the button itself.
 */
@Component({
  selector: "button[markas-toggle]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[attr.type]": "type()",
    "[attr.aria-pressed]": "on() ? 'true' : 'false'",
    "[attr.data-state]": "on() ? 'on' : 'off'",
    "[class]": "classes()",
    "(click)": "toggle($event)",
  },
  template: `<ng-content />`,
})
export class Toggle {
  readonly variant = input<ToggleVariant>("default");
  readonly size = input<ToggleSize>("md");
  readonly type = input<"button" | "submit" | "reset">("button");
  readonly pressed = input(false, { transform: booleanAttribute });
  /** Emits the new state; together with `pressed` this enables `[(pressed)]`. */
  readonly pressedChange = output<boolean>();

  protected readonly on = linkedSignal(() => this.pressed());
  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]} ${sizes[this.size()]}`,
  );

  protected toggle(event: MouseEvent) {
    if (event.defaultPrevented) return;
    const next = !this.on();
    this.on.set(next);
    this.pressedChange.emit(next);
  }
}
