import { Component } from "@angular/core";
import { TypingText } from "../../components/typing-text/typing-text.component";

@Component({
  selector: "markas-example",
  imports: [TypingText],
  template: `
    <h2 class="text-2xl font-semibold tracking-tight text-ink">
      Build interfaces for
      <span markas-typing-text [words]="words" class="text-muted"></span>
    </h2>
  `,
})
export default class TypingTextExample {
  protected readonly words = ["Laravel", "React", "Vue"];
}
