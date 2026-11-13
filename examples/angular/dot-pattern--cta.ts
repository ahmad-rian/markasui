import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { DotPattern } from "../../components/dot-pattern/dot-pattern.component";

@Component({
  selector: "markas-example",
  imports: [Button, DotPattern],
  template: `
    <div
      markas-dot-pattern
      color="primary"
      mask="linear"
      [spacing]="20"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-4">
        <div class="grid gap-1.5">
          <h3 class="text-lg font-semibold text-ink">
            Ready to launch your next project?
          </h3>
          <p class="text-sm text-muted">
            Start with a free workspace. Upgrade when your team grows.
          </p>
        </div>
        <div class="flex gap-2">
          <button markas-button>Create workspace</button>
          <button markas-button variant="ghost">Talk to sales</button>
        </div>
      </div>
    </div>
  `,
})
export default class DotPatternCtaExample {}
