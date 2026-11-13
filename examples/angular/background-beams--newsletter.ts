import { Component } from "@angular/core";
import { BackgroundBeams } from "../../components/background-beams/background-beams.component";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundBeams, Button, Input],
  template: `
    <div
      markas-background-beams
      variant="pulse"
      [count]="10"
      class="rounded-xl border border-line bg-canvas p-6"
    >
      <form class="grid gap-4">
        <div class="grid gap-1">
          <h3 class="text-xl font-semibold text-ink">The Friday digest</h3>
          <p class="text-sm text-muted">
            One email a week with the best product updates. No spam.
          </p>
        </div>
        <div class="flex items-end gap-2">
          <div class="flex-1">
            <markas-input
              label="Email"
              type="email"
              placeholder="you&#64;company.com"
            />
          </div>
          <button markas-button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  `,
})
export default class BackgroundBeamsNewsletterExample {}
