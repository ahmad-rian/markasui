import { Component } from "@angular/core";
import { Skeleton } from "../../components/skeleton/skeleton.component";

@Component({
  selector: "markas-example",
  imports: [Skeleton],
  template: `
    <div
      class="divide-y divide-line rounded-lg border border-line bg-surface"
      role="status"
    >
      <span class="sr-only">Loading messages</span>
      <div class="flex items-center gap-3 p-4">
        <div markas-skeleton shape="circle" class="size-10 shrink-0"></div>
        <div class="grid flex-1 gap-2">
          <div markas-skeleton class="h-4 w-1/3"></div>
          <div markas-skeleton class="h-3 w-2/3"></div>
        </div>
      </div>
      <div class="flex items-center gap-3 p-4">
        <div markas-skeleton shape="circle" class="size-10 shrink-0"></div>
        <div class="grid flex-1 gap-2">
          <div markas-skeleton class="h-4 w-1/4"></div>
          <div markas-skeleton class="h-3 w-3/4"></div>
        </div>
      </div>
      <div class="flex items-center gap-3 p-4">
        <div markas-skeleton shape="circle" class="size-10 shrink-0"></div>
        <div class="grid flex-1 gap-2">
          <div markas-skeleton class="h-4 w-2/5"></div>
          <div markas-skeleton class="h-3 w-1/2"></div>
        </div>
      </div>
    </div>
  `,
})
export default class SkeletonListExample {}
