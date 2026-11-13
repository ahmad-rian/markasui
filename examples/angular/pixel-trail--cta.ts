import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { PixelTrail } from "../../components/pixel-trail/pixel-trail.component";

@Component({
  selector: "markas-example",
  imports: [Button, PixelTrail],
  template: `
    <markas-pixel-trail
      variant="dot"
      color="success"
      [cellSize]="16"
      [fade]="900"
      [class]="card"
    >
      <div>
        <h3 [class]="title">Join 4,000 teams across Indonesia</h3>
        <p [class]="text">Free for 14 days, then from Rp 49.000 a month.</p>
      </div>
      <div [class]="actions">
        <button markas-button>Start free trial</button>
        <button markas-button variant="secondary">Talk to sales</button>
      </div>
    </markas-pixel-trail>
  `,
})
export default class PixelTrailCtaExample {
  protected readonly card =
    "grid gap-4 rounded-xl border border-line bg-subtle p-6";
  protected readonly title = "text-xl font-semibold text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
  protected readonly actions = "flex flex-wrap gap-3";
}
