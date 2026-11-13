import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

const base =
  "rounded-lg [scrollbar-color:var(--markas-line)_transparent] [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-track]:bg-transparent";
const orientations = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
};

export type ScrollAreaOrientation = keyof typeof orientations;

/**
 * Attribute selector on a native div, so the user's class and attributes stay on the region.
 * Usage: `<div markas-scroll-area label="Releases">...</div>`.
 */
@Component({
  selector: "div[markas-scroll-area]",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "region",
    tabindex: "0",
    "[attr.aria-label]": "label()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "classes()",
  },
  template: `<ng-content />`,
})
export class ScrollArea {
  readonly orientation = input<ScrollAreaOrientation>("vertical");
  /** Accessible name of the scrollable region. */
  readonly label = input("Scrollable content");

  protected readonly classes = computed(
    () => `${base} ${orientations[this.orientation()]}`,
  );
}
