import { Component } from "@angular/core";
import { ScrollArea } from "../../components/scroll-area/scroll-area.component";

@Component({
  selector: "markas-example",
  imports: [ScrollArea],
  template: `
    <div
      markas-scroll-area
      label="Releases"
      class="max-h-56 border border-line bg-surface"
    >
      <div class="p-4">
        <p class="mb-2 text-sm font-medium text-ink">Releases</p>
        @for (release of releases; track release) {
          <p class="border-t border-line py-2 text-sm text-muted">
            {{ release }}
          </p>
        }
      </div>
    </div>
  `,
})
export default class ScrollAreaExample {
  protected readonly releases = Array.from(
    { length: 12 },
    (_, i) => `v2.${12 - i}.0`,
  );
}
