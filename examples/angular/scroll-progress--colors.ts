import { Component } from "@angular/core";
import { ScrollProgress } from "../../components/scroll-progress/scroll-progress.component";

@Component({
  selector: "markas-example",
  imports: [ScrollProgress],
  template: `
    <div class="grid grid-cols-3 gap-3">
      @for (panel of panels; track panel.color) {
        <div
          role="region"
          [attr.aria-label]="panel.title"
          tabindex="0"
          class="relative h-32 overflow-y-auto rounded-lg border border-line bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <div
            markas-scroll-progress
            target="parent"
            [color]="panel.color"
            size="md"
          ></div>
          <div class="p-3 text-xs text-muted">
            <p class="text-sm font-medium text-ink">{{ panel.title }}</p>
            <p class="mt-2">Scroll this panel to fill the bar above it.</p>
            <p class="mt-2">The bar color follows the status of the list.</p>
            <p class="mt-2">Set size for a thicker bar.</p>
          </div>
        </div>
      }
    </div>
  `,
})
export default class ScrollProgressColorsExample {
  protected readonly panels = [
    { color: "primary", title: "Draft" },
    { color: "warning", title: "In review" },
    { color: "danger", title: "Blocked" },
  ] as const;
}
