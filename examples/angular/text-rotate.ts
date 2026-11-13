import { Component } from "@angular/core";
import { TextRotate } from "../../components/text-rotate/text-rotate.component";

@Component({
  selector: "markas-example",
  imports: [TextRotate],
  template: `
    <h2 class="text-3xl font-semibold tracking-tight text-ink">
      Build for
      <span markas-text-rotate [words]="words" class="text-muted"></span>
    </h2>
  `,
})
export default class TextRotateExample {
  protected readonly words = ["Laravel", "React", "Vue"];
}
