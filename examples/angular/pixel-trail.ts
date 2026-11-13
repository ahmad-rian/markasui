import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { PixelTrail } from "../../components/pixel-trail/pixel-trail.component";

@Component({
  selector: "markas-example",
  imports: [Button, PixelTrail],
  template: `
    <markas-pixel-trail showGrid [class]="hero">
      <h3 [class]="title">Interfaces that answer the pointer</h3>
      <p [class]="text">Move across the grid and leave a trail.</p>
      <button markas-button>Get started</button>
    </markas-pixel-trail>
  `,
})
export default class PixelTrailExample {
  protected readonly hero =
    "grid h-72 content-center justify-items-center gap-3 rounded-xl border border-line bg-surface p-6 text-center";
  protected readonly title = "max-w-72 text-2xl font-semibold text-ink";
  protected readonly text = "text-sm text-muted";
}
