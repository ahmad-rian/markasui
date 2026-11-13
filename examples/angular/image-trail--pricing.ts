import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ImageTrail } from "../../components/image-trail/image-trail.component";

@Component({
  selector: "markas-example",
  imports: [Button, ImageTrail],
  template: `
    <markas-image-trail
      variant="rotate"
      [threshold]="48"
      [duration]="1000"
      autoplay
      [class]="area"
    >
      <ng-container items>
        @for (perk of perks; track perk) {
          <span [class]="chip">{{ perk }}</span>
        }
      </ng-container>
      <h3 [class]="title">Plans from Rp 49.000 a month</h3>
      <p [class]="hint">Every plan includes all three frameworks</p>
      <button markas-button>Start free trial</button>
    </markas-image-trail>
  `,
})
export default class ImageTrailPricingExample {
  protected readonly area =
    "grid h-64 content-center justify-items-center rounded-xl bg-ink p-6 text-center text-canvas";
  protected readonly chip =
    "block rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium whitespace-nowrap text-ink";
  protected readonly perks = [
    "Rp 49.000",
    "Free for 14 days",
    "Rp 149.000",
    "Cancel anytime",
  ];
  protected readonly title = "text-2xl font-semibold";
  protected readonly hint = "mt-1 mb-4 text-sm text-canvas/70";
}
