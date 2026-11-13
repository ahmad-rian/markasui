import { Component } from "@angular/core";
import { ImageCompare } from "../../components/image-compare/image-compare.component";

@Component({
  selector: "markas-example",
  imports: [ImageCompare],
  template: `
    <!-- One deterministic landscape, toned flat (before) or vivid (after). -->
    <markas-image-compare aria-label="Photo edit, before and after">
      <div before [class]="frame + ' contrast-75 grayscale'">
        <span [class]="sun"></span>
        <svg
          [class]="hills"
          viewBox="0 0 480 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            [class]="far"
            d="M0 90 70 40l70 45 80-55 90 65 80-50 90 35v100H0Z"
          />
          <path
            [class]="near"
            d="M0 130c80-30 150-10 230-25s170 15 250-5v80H0Z"
          />
          <path [class]="lake" d="M0 160c120-12 360-12 480 0v20H0Z" />
        </svg>
      </div>
      <div after [class]="frame + ' saturate-150'">
        <span [class]="sun"></span>
        <svg
          [class]="hills"
          viewBox="0 0 480 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            [class]="far"
            d="M0 90 70 40l70 45 80-55 90 65 80-50 90 35v100H0Z"
          />
          <path
            [class]="near"
            d="M0 130c80-30 150-10 230-25s170 15 250-5v80H0Z"
          />
          <path [class]="lake" d="M0 160c120-12 360-12 480 0v20H0Z" />
        </svg>
      </div>
    </markas-image-compare>
  `,
})
export default class ImageCompareExample {
  protected readonly frame =
    "relative aspect-[8/5] w-full overflow-hidden bg-linear-to-b from-warning/35 via-warning/10 to-success/20";
  protected readonly sun =
    "absolute top-8 right-20 size-14 rounded-full bg-warning";
  protected readonly hills = "absolute inset-x-0 bottom-0 h-3/5 w-full";
  protected readonly far = "fill-success/50";
  protected readonly near = "fill-success";
  protected readonly lake = "fill-surface/50";
}
