import { Component } from "@angular/core";
import { AuroraBackground } from "../../components/aurora-background/aurora-background.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [AuroraBackground, Button],
  template: `
    <div
      markas-aurora-background
      color="warning"
      speed="slow"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <div class="grid gap-4">
        <div class="grid gap-1.5">
          <p class="text-sm font-medium text-muted">Pro plan</p>
          <p class="flex items-baseline gap-1">
            <span class="text-4xl font-semibold text-ink">$24</span>
            <span class="text-sm text-muted">per seat / month</span>
          </p>
          <p class="text-sm text-muted">
            Unlimited projects, priority support, and audit logs.
          </p>
        </div>
        <button markas-button class="w-full">Upgrade to Pro</button>
      </div>
    </div>
  `,
})
export default class AuroraBackgroundPricingExample {}
