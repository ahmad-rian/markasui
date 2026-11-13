import { Component } from "@angular/core";
import { Skeleton } from "../../components/skeleton/skeleton.component";

@Component({
  selector: "markas-example",
  imports: [Skeleton],
  template: `
    <div class="grid gap-3" role="status">
      <span class="sr-only">Loading content</span>
      <div markas-skeleton class="h-6 w-1/2"></div>
      <div class="grid gap-2">
        <div markas-skeleton class="h-4 w-full"></div>
        <div markas-skeleton class="h-4 w-full"></div>
        <div markas-skeleton class="h-4 w-11/12"></div>
        <div markas-skeleton class="h-4 w-2/3"></div>
      </div>
    </div>
  `,
})
export default class SkeletonTextExample {}
