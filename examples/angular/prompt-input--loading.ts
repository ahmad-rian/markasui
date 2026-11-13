import { Component, signal } from "@angular/core";
import { PromptInput } from "../../components/prompt-input/prompt-input.component";

@Component({
  selector: "markas-example",
  imports: [PromptInput],
  template: `
    <markas-prompt-input
      [(value)]="text"
      [loading]="loading()"
      (stop)="loading.set(false)"
      (send)="loading.set(true)"
    />
  `,
})
export default class PromptInputLoadingExample {
  protected readonly loading = signal(true);
  protected readonly text = signal("Summarize the March invoices by client");
}
