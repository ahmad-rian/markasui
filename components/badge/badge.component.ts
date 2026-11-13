import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap";
const variants = {
  neutral: "border-line bg-subtle text-ink",
  primary: "border-primary-line bg-primary-soft text-primary",
  success: "border-success/30 bg-success/10 text-ink",
  warning: "border-warning/30 bg-warning/10 text-ink",
  danger: "border-danger/30 bg-danger/10 text-ink",
};
const dotBase = "size-1.5 shrink-0 rounded-full";
const dots = {
  neutral: "bg-muted",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export type BadgeVariant = keyof typeof variants;

/**
 * Attribute selector on a native span: the user class and any aria-* or title stay on the
 * badge itself, so nothing has to be forwarded.
 */
@Component({
  selector: "span[markas-badge]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "classes()" },
  template: `@if (dot()) {
      <span [class]="dotClasses()" aria-hidden="true"></span>
    }
    <ng-content />`,
})
export class Badge {
  readonly variant = input<BadgeVariant>("neutral");
  /** Colored dot before the text. Turn it off for badges with an icon or a number. */
  readonly dot = input(true, { transform: booleanAttribute });

  protected readonly classes = computed(
    () => `${base} ${variants[this.variant()]}`,
  );
  protected readonly dotClasses = computed(
    () => `${dotBase} ${dots[this.variant()]}`,
  );
}
