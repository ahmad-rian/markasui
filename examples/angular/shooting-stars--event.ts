import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ShootingStars } from "../../components/shooting-stars/shooting-stars.component";

@Component({
  selector: "markas-example",
  imports: [Button, ShootingStars],
  template: `
    <div
      markas-shooting-stars
      variant="dawn"
      frequency="high"
      trailColor="danger"
      stars="40"
      seed="17"
      class="dark rounded-xl border border-line bg-canvas px-6 py-10"
    >
      <div class="grid gap-4">
        <p class="text-sm font-medium text-muted">
          Live, 14 November, 06:00 UTC
        </p>
        <h3 class="text-2xl font-semibold text-balance text-ink">
          Sunrise Summit: watch the keynote as it lands
        </h3>
        <p class="max-w-80 text-sm text-muted">
          Four talks, one hour, and a few surprises we have kept quiet all year.
        </p>
        <div class="flex gap-2">
          <button markas-button>Save my spot</button>
          <button markas-button variant="ghost">Add to calendar</button>
        </div>
      </div>
    </div>
  `,
})
export default class ShootingStarsEventExample {}
