import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { HeroHighlight } from "../../components/hero-highlight/hero-highlight.component";

@Component({
  selector: "markas-example",
  imports: [Button, HeroHighlight],
  template: `
    <div
      markas-hero-highlight
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2
          class="max-w-96 text-3xl leading-snug font-semibold tracking-tight text-balance text-ink"
        >
          Stop guessing. <mark>Start measuring</mark> what users love.
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Product analytics that answer real questions in seconds, not sprints.
        </p>
        <div class="flex gap-2">
          <button markas-button>Start free trial</button>
          <button markas-button variant="ghost">Watch demo</button>
        </div>
      </div>
    </div>
  `,
})
export default class HeroHighlightFixture {}
