import { Component } from "@angular/core";
import { TypingText } from "../../components/typing-text/typing-text.component";

@Component({
  selector: "markas-example",
  imports: [TypingText],
  template: `
    <p class="text-base text-muted">
      Your order is
      <span
        markas-typing-text
        [words]="words"
        [cursor]="false"
        class="font-medium text-ink"
      ></span>
    </p>
  `,
})
export default class TypingTextInlineExample {
  protected readonly words = ["packed", "on its way", "out for delivery"];
}
