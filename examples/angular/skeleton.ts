import { Component } from "@angular/core";
import { Skeleton } from "../../components/skeleton/skeleton.component";

@Component({
  selector: "markas-example",
  imports: [Skeleton],
  template: `
    <div
      class="flex items-center gap-4 rounded-lg border border-line bg-surface p-4"
      role="status"
    >
      <span class="sr-only">Loading profile</span>
      <div markas-skeleton shape="circle" class="size-12 shrink-0"></div>
      <div class="grid flex-1 gap-2">
        <div markas-skeleton class="h-4 w-2/3"></div>
        <div markas-skeleton class="h-4 w-1/2"></div>
      </div>
    </div>
  `,
})
export default class SkeletonExample {}
