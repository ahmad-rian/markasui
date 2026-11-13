import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const roots = {
  horizontal: "h-px w-full shrink-0 bg-line",
  vertical: "w-px shrink-0 self-stretch bg-line",
};
const labeledRoots = {
  horizontal: "flex w-full items-center gap-3 text-xs text-muted",
  vertical:
    "flex shrink-0 flex-col items-center gap-2 self-stretch text-xs text-muted",
};
const lines = {
  horizontal: "h-px flex-1 bg-line",
  vertical: "w-px flex-1 bg-line",
};

export type SeparatorOrientation = keyof typeof roots;

/**
 * Attribute selector on a native div: the user's class and attributes stay on the line itself.
 * Usage: `<div markas-separator orientation="vertical"></div>`.
 */
@Component({
  selector: "div[markas-separator]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classes()",
    "[attr.role]": "decorative() ? 'none' : 'separator'",
    "[attr.aria-orientation]": "decorative() ? null : orientation()",
    "[attr.aria-label]": "decorative() ? null : label() || null",
  },
  template: `
    @if (label()) {
      <span [class]="line()"></span>
      <span>{{ label() }}</span>
      <span [class]="line()"></span>
    }
  `,
})
export class Separator {
  readonly orientation = input<SeparatorOrientation>("horizontal");
  /** Visual only (role="none"). Turn off when the line separates meaningful sections. */
  readonly decorative = input(true, { transform: booleanAttribute });
  /** Text in the middle of the line, for example "or". */
  readonly label = input<string>();

  protected readonly line = computed(() => lines[this.orientation()]);
  protected readonly classes = computed(() =>
    this.label() ? labeledRoots[this.orientation()] : roots[this.orientation()],
  );
}
