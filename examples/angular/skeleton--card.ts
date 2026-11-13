import { Component } from "@angular/core";
import { Skeleton } from "../../components/skeleton/skeleton.component";

@Component({
  selector: "markas-example",
  imports: [Skeleton],
  template: `
    <div
      class="grid gap-4 rounded-lg border border-line bg-surface p-4"
      role="status"
    >
      <span class="sr-only">Loading article</span>
      <div markas-skeleton class="h-36 w-full"></div>
      <div class="grid gap-2">
        <div markas-skeleton class="h-5 w-3/4"></div>
        <div markas-skeleton class="h-4 w-full"></div>
        <div markas-skeleton class="h-4 w-5/6"></div>
      </div>
      <div markas-skeleton class="h-10 w-28"></div>
    </div>
  `,
})
export default class SkeletonCardExample {}
