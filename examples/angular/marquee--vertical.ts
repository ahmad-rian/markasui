import { Component } from "@angular/core";
import { Marquee } from "../../components/marquee/marquee.component";

@Component({
  selector: "markas-example",
  imports: [Marquee],
  template: `
    <div markas-marquee vertical duration="18" class="h-64">
      @for (event of events; track event.who) {
        <div class="rounded-lg border border-line bg-surface px-4 py-3">
          <p class="text-sm text-ink">
            <span class="font-medium">{{ event.who }}</span> {{ event.what }}
          </p>
          <p class="mt-0.5 text-xs text-muted">{{ event.when }}</p>
        </div>
      }
    </div>
  `,
})
export default class MarqueeVerticalExample {
  protected readonly events = [
    { who: "Maya Putri", what: "deployed to production", when: "2 min ago" },
    { who: "Rizal Hakim", what: "opened a pull request", when: "8 min ago" },
    { who: "Ana Lim", what: "closed 3 issues", when: "15 min ago" },
    { who: "John Carter", what: "commented on Tabs", when: "21 min ago" },
  ];
}
