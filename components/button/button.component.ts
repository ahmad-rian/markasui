import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none";
const variants = {
  primary: "bg-primary text-on-primary hover:bg-primary-strong",
  secondary: "border border-line bg-surface text-ink hover:bg-subtle",
  ghost: "text-ink hover:bg-subtle",
  danger: "bg-danger text-on-primary hover:bg-danger/90",
};
const sizes = {
  sm: "h-8 rounded-md px-3 text-sm",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-lg px-6 text-base",
};

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

/**
 * Attribute selector on the native button: disabled, aria-*, name, value, and the user's
 * class stay on the button itself, so nothing has to be forwarded.
 */
@Component({
  selector: "button[markas-button]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[attr.type]": "type()", "[class]": "classes()" },
  template: `<ng-content />`,
})
export class Button {
  readonly variant = input<ButtonVariant>("primary");
  readonly size = input<ButtonSize>("md");
  readonly type = input<"button" | "submit" | "reset">("button");

  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]} ${sizes[this.size()]}`,
  );
}
