import { Component } from "@angular/core";
import { PromptInput } from "../../components/prompt-input/prompt-input.component";

@Component({
  selector: "markas-example",
  imports: [PromptInput],
  template: `
    <div [class]="panel">
      <p [class]="title">What should we build today?</p>
      <markas-prompt-input
        [models]="['Markas Pro', 'Markas Mini']"
        model="Markas Pro"
        [maxLength]="500"
        accept="image/*,.pdf"
      />
    </div>
  `,
})
export default class PromptInputExample {
  protected readonly panel = "grid gap-4";
  protected readonly title = "text-center text-lg font-semibold text-ink";
}
