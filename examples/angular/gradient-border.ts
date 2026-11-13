import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { GradientBorder } from "../../components/gradient-border/gradient-border.component";

@Component({
  selector: "markas-example",
  imports: [Button, GradientBorder],
  template: `
    <div markas-gradient-border class="mx-auto max-w-80">
      <div class="grid gap-3 p-6">
        <h3 class="text-lg font-semibold text-ink">Pro workspace</h3>
        <p class="text-sm text-muted">
          Unlimited projects, priority support, and advanced analytics.
        </p>
        <p class="text-3xl font-bold text-ink">
          $24<span class="text-sm font-normal text-muted"> / month</span>
        </p>
        <button markas-button>Upgrade now</button>
      </div>
    </div>
  `,
})
export default class GradientBorderFixture {}
