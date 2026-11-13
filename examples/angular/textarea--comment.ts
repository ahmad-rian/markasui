import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Textarea } from "../../components/textarea/textarea.component";

@Component({
  selector: "markas-example",
  imports: [Button, Textarea],
  template: `
    <div class="grid gap-3 rounded-lg border border-line bg-surface p-4">
      <markas-textarea
        name="comment"
        aria-label="Comment"
        rows="3"
        placeholder="Leave a comment"
      />
      <div class="flex items-center justify-between gap-4">
        <p class="text-sm text-muted">Markdown is supported.</p>
        <div class="flex gap-2">
          <button markas-button variant="ghost" size="sm">Cancel</button>
          <button markas-button size="sm">Comment</button>
        </div>
      </div>
    </div>
  `,
})
export default class TextareaCommentExample {}
