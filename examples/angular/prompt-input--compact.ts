import { Component } from "@angular/core";
import { PromptInput } from "../../components/prompt-input/prompt-input.component";

@Component({
  selector: "markas-example",
  imports: [PromptInput],
  template: `
    <div [class]="card">
      <div [class]="head">
        <span aria-hidden="true" [class]="avatar">RS</span>
        <div>
          <p [class]="name">Rina Santoso</p>
          <p [class]="meta">Asked about order #INV-2041</p>
        </div>
      </div>
      <p [class]="quote">Can I pay the balance by bank transfer?</p>
      <markas-prompt-input
        [attachments]="false"
        [maxHeight]="120"
        placeholderLabel="Reply to Rina"
        inputLabel="Reply"
      />
    </div>
  `,
})
export default class PromptInputCompactExample {
  protected readonly card =
    "grid gap-3 rounded-xl border border-line bg-surface p-4";
  protected readonly head = "flex items-center gap-3";
  protected readonly avatar =
    "grid size-9 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-ink";
  protected readonly name = "text-sm font-semibold text-ink";
  protected readonly meta = "text-xs text-muted";
  protected readonly quote = "rounded-lg bg-subtle px-3 py-2 text-sm text-ink";
}
