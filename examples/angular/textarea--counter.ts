import { Component } from "@angular/core";
import { Textarea } from "../../components/textarea/textarea.component";

@Component({
  selector: "markas-example",
  imports: [Textarea],
  template: `
    <div class="grid gap-1.5">
      <markas-textarea
        name="summary"
        label="Summary"
        rows="3"
        maxlength="200"
        value="Weekly sync moves to Thursday at 10:00. Please review the roadmap draft before the meeting."
      />
      <div class="flex justify-between gap-4 text-sm text-muted">
        <p>Visible to everyone in the project.</p>
        <p>91 / 200</p>
      </div>
    </div>
  `,
})
export default class TextareaCounterExample {}
