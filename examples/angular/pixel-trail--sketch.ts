import { Component } from "@angular/core";
import { PixelTrail } from "../../components/pixel-trail/pixel-trail.component";

@Component({
  selector: "markas-example",
  imports: [PixelTrail],
  template: `
    <markas-pixel-trail
      variant="brush"
      color="warning"
      [cellSize]="12"
      [fade]="1500"
      autoplay
      [class]="pad"
    >
      <p [class]="title">Sketch pad</p>
      <p [class]="text">Draw with your cursor. It doodles on its own too.</p>
    </markas-pixel-trail>
  `,
})
export default class PixelTrailSketchExample {
  protected readonly pad =
    "grid h-64 content-end rounded-xl border border-dashed border-line bg-canvas p-4";
  protected readonly title = "text-sm font-semibold text-ink";
  protected readonly text = "text-sm text-muted";
}
