import { Component } from "@angular/core";
import { ImageCompare } from "../../components/image-compare/image-compare.component";

@Component({
  selector: "markas-example",
  imports: [ImageCompare],
  template: `
    <markas-image-compare
      aria-label="Revenue widget redesign"
      beforeLabel="Old"
      afterLabel="New"
    >
      <ng-container before>
        <div [class]="oldPanel">
          <p [class]="oldText">Revenue: 48210 USD</p>
          <div [class]="oldCards">
            <div [class]="oldCard"></div>
            <div [class]="oldCard"></div>
            <div [class]="oldCard"></div>
          </div>
          <div [class]="oldChart">
            @for (height of bars; track height) {
              <div [class]="\`\${oldBar} \${height}\`"></div>
            }
          </div>
        </div>
      </ng-container>
      <ng-container after>
        <div [class]="newPanel">
          <div [class]="newHeader">
            <p [class]="newLabel">Revenue this month</p>
            <p [class]="newValue">
              $48,210 <span [class]="newBadge">+12%</span>
            </p>
          </div>
          <div [class]="newChart">
            @for (height of bars; track height; let index = $index) {
              <div
                [class]="\`\${index === bars.length - 1 ? newLast : newBar} \${height}\`"
              ></div>
            }
          </div>
        </div>
      </ng-container>
    </markas-image-compare>
  `,
})
export default class ImageCompareRedesignExample {
  protected readonly oldPanel =
    "grid h-60 content-start gap-3 bg-subtle px-5 pt-14";
  protected readonly oldText = "text-sm text-muted";
  protected readonly oldCards = "grid grid-cols-3 gap-2";
  protected readonly oldCard = "h-12 border border-line bg-surface";
  protected readonly oldChart = "flex h-16 items-end gap-1";
  protected readonly oldBar = "w-6 bg-faint/40";
  protected readonly newPanel =
    "grid h-60 content-start gap-5 bg-surface px-5 pt-14";
  protected readonly newHeader = "flex items-baseline justify-between gap-4";
  protected readonly newLabel = "text-sm text-muted";
  protected readonly newValue =
    "flex items-baseline gap-2 text-2xl font-semibold text-ink";
  protected readonly newBadge = "text-sm font-medium text-success";
  protected readonly newChart = "flex h-20 items-end gap-2";
  protected readonly newBar = "flex-1 rounded-t-md bg-primary/80";
  protected readonly newLast = "flex-1 rounded-t-md bg-success";
  protected readonly bars = [
    "h-[40%]",
    "h-[65%]",
    "h-[50%]",
    "h-[80%]",
    "h-[60%]",
    "h-[90%]",
  ];
}
