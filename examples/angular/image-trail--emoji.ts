import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ImageTrail } from "../../components/image-trail/image-trail.component";

@Component({
  selector: "markas-example",
  imports: [Button, ImageTrail],
  template: `
    <markas-image-trail variant="scale" [threshold]="32" [class]="area">
      <ng-container items>
        @for (food of foods; track food) {
          <span [class]="emoji">{{ food }}</span>
        }
      </ng-container>
      <p [class]="eyebrow">Jl. Braga, Bandung</p>
      <h3 [class]="title">Weekend street food market</h3>
      <p [class]="hint">40 stalls, Saturday and Sunday from 4 pm</p>
      <button markas-button>See the stalls</button>
    </markas-image-trail>
  `,
})
export default class ImageTrailEmojiExample {
  protected readonly area =
    "grid h-72 content-center justify-items-start gap-3 rounded-xl bg-primary-soft p-8";
  protected readonly emoji = "block text-4xl";
  protected readonly foods = ["🍜", "🍢", "🌶️", "🥥", "🍌"];
  protected readonly eyebrow = "text-sm font-medium text-primary";
  protected readonly title = "max-w-64 text-2xl font-semibold text-ink";
  protected readonly hint = "text-sm text-muted";
}
