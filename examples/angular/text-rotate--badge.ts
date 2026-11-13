import { Component } from "@angular/core";
import { TextRotate } from "../../components/text-rotate/text-rotate.component";

@Component({
  selector: "markas-example",
  imports: [TextRotate],
  template: `
    <div class="flex justify-center">
      <a
        href="#"
        class="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1 text-sm text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span
          class="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium"
        >
          Now hiring
        </span>
        <span
          markas-text-rotate
          [words]="words"
          from="last"
          interval="2000"
        ></span>
      </a>
    </div>
  `,
})
export default class TextRotateBadgeExample {
  protected readonly words = ["designers", "engineers", "writers"];
}
