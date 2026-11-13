import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from "@angular/core";

const root = "group w-full";
const summary =
  "flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-2 text-left text-sm font-medium text-ink transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none [&::-webkit-details-marker]:hidden";
const icon =
  "size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none";
const content = "pt-2 pb-2 text-sm text-muted";

/**
 * Attribute selector on the native details: id, class, and the toggle event stay on the
 * element itself. The title input is cleared from the host so it does not become a tooltip.
 * An element with the `title` attribute (ng-container works) replaces the title text.
 */
@Component({
  selector: "details[markas-collapsible]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "root", "[attr.title]": "null", "[open]": "open()" },
  template: `
    <summary [class]="summary">
      <span
        ><ng-content select="[title]">{{ title() }}</ng-content></span
      >
      <svg
        [class]="icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div [class]="content"><ng-content /></div>
  `,
})
export class Collapsible {
  readonly title = input("");
  /** Starting state. Listen to the native (toggle) event for changes. */
  readonly open = input(false, { transform: booleanAttribute });

  protected readonly root = root;
  protected readonly summary = summary;
  protected readonly icon = icon;
  protected readonly content = content;
}
