import { Component } from "@angular/core";
import { SpotlightCard } from "../../components/spotlight-card/spotlight-card.component";

@Component({
  selector: "markas-example",
  imports: [SpotlightCard],
  template: `
    <div markas-spotlight-card>
      <div class="p-6">
        <span
          class="flex size-10 items-center justify-center rounded-lg bg-subtle text-ink"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M13 3 4 14h7l-1 7 9-11h-7l1-7Z" />
          </svg>
        </span>
        <h3 class="mt-4 text-base font-semibold text-ink">Instant previews</h3>
        <p class="mt-1 text-sm text-muted">
          Every pull request gets its own preview link, ready before the review
          starts.
        </p>
      </div>
    </div>
  `,
})
export default class SpotlightCardExample {}
