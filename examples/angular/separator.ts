import { Component } from "@angular/core";
import { Separator } from "../../components/separator/separator.component";

@Component({
  selector: "markas-example",
  imports: [Separator],
  template: `
    <div class="rounded-xl border border-line bg-surface p-4 text-ink">
      <p class="text-sm font-medium">MarkasUI</p>
      <p class="text-sm text-muted">Components for Blade, React, and Vue.</p>
      <div markas-separator class="my-4"></div>
      <div class="flex h-5 items-center gap-3 text-sm">
        <span>Docs</span>
        <div markas-separator orientation="vertical"></div>
        <span>Components</span>
        <div markas-separator orientation="vertical"></div>
        <span>Changelog</span>
      </div>
    </div>
  `,
})
export default class SeparatorExample {}
