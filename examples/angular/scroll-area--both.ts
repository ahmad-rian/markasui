import { Component } from "@angular/core";
import { ScrollArea } from "../../components/scroll-area/scroll-area.component";

@Component({
  selector: "markas-example",
  imports: [ScrollArea],
  template: `
    <div
      markas-scroll-area
      label="Weekly schedule"
      orientation="both"
      class="max-h-60 border border-line bg-surface"
    >
      <div class="grid w-[640px] grid-cols-[4rem_repeat(7,1fr)] text-sm">
        <div class="border-b border-line p-2"></div>
        @for (day of days; track day) {
          <div class="border-b border-line p-2 font-medium text-ink">
            {{ day }}
          </div>
        }
        @for (hour of hours; track hour) {
          <div class="contents">
            <div class="p-2 text-muted">{{ hour }}</div>
            @for (day of days; track day) {
              <div class="m-1 h-8 rounded-md bg-subtle"></div>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export default class ScrollAreaBothExample {
  protected readonly days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  protected readonly hours = Array.from(
    { length: 10 },
    (_, i) => `${String(i + 8).padStart(2, "0")}:00`,
  );
}
