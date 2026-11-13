import { Component } from "@angular/core";
import { TextRotate } from "../../components/text-rotate/text-rotate.component";

@Component({
  selector: "markas-example",
  imports: [TextRotate],
  template: `
    <div class="py-4 text-center">
      <h2 class="text-4xl font-semibold tracking-tight text-ink">
        Ship
        <span
          markas-text-rotate
          [words]="words"
          split="words"
          from="center"
          class="rounded-lg bg-primary px-3 text-on-primary"
        ></span>
      </h2>
      <p class="mx-auto mt-4 max-w-sm text-sm text-muted">
        One component library for Blade, React, and Vue.
      </p>
    </div>
  `,
})
export default class TextRotateHeroExample {
  protected readonly words = ["faster", "with confidence", "every Friday"];
}
