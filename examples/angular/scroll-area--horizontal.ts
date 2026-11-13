import { Component } from "@angular/core";
import { ScrollArea } from "../../components/scroll-area/scroll-area.component";

@Component({
  selector: "markas-example",
  imports: [ScrollArea],
  template: `
    <div markas-scroll-area label="Recently played" orientation="horizontal">
      <div class="flex gap-3 pb-3">
        @for (album of albums; track album) {
          <div class="w-32 shrink-0">
            <div class="h-32 rounded-lg bg-subtle"></div>
            <p class="mt-2 truncate text-sm font-medium text-ink">
              {{ album }}
            </p>
          </div>
        }
      </div>
    </div>
  `,
})
export default class ScrollAreaHorizontalExample {
  protected readonly albums = [
    "Morning light",
    "City nights",
    "Slow mornings",
    "Coastline",
    "Weekend drive",
    "Rain sounds",
  ];
}
