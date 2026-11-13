import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from "@angular/core";

const base = "text-sm font-medium text-ink";
const marker = "ms-0.5 text-danger";
const srOnly = "sr-only";
const optionalClass = "font-normal text-muted";

/**
 * Attribute selector on the native label: for, id, and the user's class stay on the label
 * itself, so nothing has to be forwarded.
 */
@Component({
  selector: "label[markas-label]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "base" },
  // Kept on one line: formatting would add whitespace text around the marker and the optional text.
  // prettier-ignore
  template: `<ng-content />@if (required()) {<span aria-hidden="true" [class]="marker">*</span>{{ " " }}<span [class]="srOnly">{{ requiredLabel() }}</span>} @else if (optional()) {{{ " " }}<span [class]="optionalClass">{{ optionalLabel() }}</span>}`,
})
export class Label {
  readonly required = input(false, { transform: booleanAttribute });
  readonly optional = input(false, { transform: booleanAttribute });
  /** Screen reader text after the required marker. */
  readonly requiredLabel = input("required");
  /** Visible text after an optional label. */
  readonly optionalLabel = input("Optional");

  protected readonly base = base;
  protected readonly marker = marker;
  protected readonly srOnly = srOnly;
  protected readonly optionalClass = optionalClass;
}
