import { Component } from "@angular/core";
import { ImageTrail } from "../../components/image-trail/image-trail.component";

@Component({
  selector: "markas-example",
  imports: [ImageTrail],
  template: `
    <markas-image-trail [class]="area">
      <ng-container items>
        @for (card of cards; track card) {
          <span [class]="card"></span>
        }
      </ng-container>
      <p [class]="title">Move your cursor here</p>
      <p [class]="hint">Color cards follow the pointer and fade away</p>
    </markas-image-trail>
  `,
})
export default class ImageTrailExample {
  protected readonly area =
    "grid h-72 content-center justify-items-center rounded-xl border border-line bg-subtle p-6 text-center";
  protected readonly cards = [
    "block h-20 w-16 rounded-lg bg-primary",
    "block h-20 w-16 rounded-lg bg-success",
    "block h-20 w-16 rounded-lg bg-warning",
    "block h-20 w-16 rounded-lg bg-danger",
    "block h-20 w-16 rounded-lg bg-primary-soft",
  ];
  protected readonly title = "text-lg font-semibold text-ink";
  protected readonly hint = "mt-1 text-sm text-muted";
}
