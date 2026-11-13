import { Component } from "@angular/core";
import { ImageCompare } from "../../components/image-compare/image-compare.component";

@Component({
  selector: "markas-example",
  imports: [ImageCompare],
  template: `
    <markas-image-compare
      orientation="vertical"
      [position]="45"
      aria-label="Product card, wireframe and final design"
      beforeLabel="Wireframe"
      afterLabel="Final"
    >
      <ng-container before>
        <div [class]="panel">
          <div [class]="sketchImage"></div>
          <div [class]="sketchBody">
            <div [class]="\`\${sketchLine} w-3/4\`"></div>
            <div [class]="\`\${sketchLine} w-full\`"></div>
            <div [class]="\`\${sketchLine} w-1/3\`"></div>
            <div [class]="sketchButton"></div>
          </div>
        </div>
      </ng-container>
      <ng-container after>
        <div [class]="panel">
          <div [class]="image">
            <svg
              [class]="icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M5 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 2v3M11 2v3"
              />
            </svg>
          </div>
          <div [class]="body">
            <p [class]="title">Ceramic pour-over</p>
            <p [class]="text">Hand glazed, holds 600 ml.</p>
            <p [class]="price">$34</p>
            <span [class]="button">Add to cart</span>
          </div>
        </div>
      </ng-container>
    </markas-image-compare>
  `,
})
export default class ImageCompareVerticalExample {
  protected readonly panel = "flex h-64 items-center gap-5 bg-surface p-6";
  protected readonly sketchImage =
    "aspect-square w-28 shrink-0 rounded-lg border-2 border-dashed border-line";
  protected readonly sketchBody = "grid flex-1 gap-2.5";
  protected readonly sketchLine =
    "h-3 rounded-sm border-2 border-dashed border-line";
  protected readonly sketchButton =
    "mt-2 h-9 w-28 rounded-lg border-2 border-dashed border-line";
  protected readonly image =
    "grid aspect-square w-28 shrink-0 place-items-center rounded-lg bg-linear-to-br from-warning/40 to-danger/25 text-ink";
  protected readonly icon = "size-10";
  protected readonly body = "grid flex-1 gap-1";
  protected readonly title = "text-base font-semibold text-ink";
  protected readonly text = "text-sm text-muted";
  protected readonly price = "mt-1 text-sm font-semibold text-ink";
  protected readonly button =
    "mt-2 inline-flex h-9 w-28 items-center justify-center rounded-lg bg-primary text-sm font-medium text-on-primary";
}
