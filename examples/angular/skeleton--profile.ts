import { Component } from "@angular/core";
import { Skeleton } from "../../components/skeleton/skeleton.component";

@Component({
  selector: "markas-example",
  imports: [Skeleton],
  template: `
    <div
      class="grid justify-items-center gap-4 rounded-lg border border-line bg-surface p-6"
      role="status"
    >
      <span class="sr-only">Loading profile</span>
      <div markas-skeleton shape="circle" class="size-20"></div>
      <div class="grid w-full justify-items-center gap-2">
        <div markas-skeleton class="h-5 w-40"></div>
        <div markas-skeleton class="h-4 w-56"></div>
      </div>
      <div class="grid w-full grid-cols-3 gap-3">
        <div markas-skeleton class="h-12"></div>
        <div markas-skeleton class="h-12"></div>
        <div markas-skeleton class="h-12"></div>
      </div>
    </div>
  `,
})
export default class SkeletonProfileExample {}
