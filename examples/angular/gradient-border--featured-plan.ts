import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { GradientBorder } from "../../components/gradient-border/gradient-border.component";

@Component({
  selector: "markas-example",
  imports: [Button, GradientBorder],
  template: `
    <div class="grid grid-cols-2 gap-4 p-4">
      <div class="grid gap-2 rounded-xl border border-line bg-surface p-5">
        <h3 class="text-base font-semibold text-ink">Starter</h3>
        <p class="text-2xl font-bold text-ink">$0</p>
        <p class="text-sm text-muted">For side projects.</p>
        <button markas-button variant="secondary">Choose</button>
      </div>
      <div markas-gradient-border variant="pulse" glow>
        <div class="grid gap-2 p-5">
          <h3 class="text-base font-semibold text-ink">Team</h3>
          <p class="text-2xl font-bold text-ink">$49</p>
          <p class="text-sm text-muted">Most popular.</p>
          <button markas-button>Choose</button>
        </div>
      </div>
    </div>
  `,
})
export default class GradientBorderFeaturedPlanExample {}
