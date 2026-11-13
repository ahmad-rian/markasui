import { Component } from "@angular/core";
import { AuroraBackground } from "../../components/aurora-background/aurora-background.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [AuroraBackground, Button],
  template: `
    <div
      markas-aurora-background
      speed="fast"
      class="rounded-lg border border-line bg-surface px-4 py-3"
    >
      <div class="flex items-center justify-between gap-3">
        <p class="text-sm text-ink">
          <span class="font-semibold">New:</span> AI summaries for every meeting
        </p>
        <button markas-button size="sm" variant="secondary">Learn more</button>
      </div>
    </div>
  `,
})
export default class AuroraBackgroundBannerExample {}
