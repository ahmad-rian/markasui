import { Component, signal } from "@angular/core";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

@Component({
  selector: "markas-example",
  imports: [TextHighlighter],
  template: `
    <div class="grid gap-4">
      <p class="text-base leading-7 text-muted">
        Before you publish, check that the
        <span markas-text-highlighter trigger="manual" [active]="active()"
          >title fits in 60 characters</span
        >, every image has
        <span
          markas-text-highlighter
          trigger="manual"
          [active]="active()"
          color="success"
          delay="250"
          >alt text</span
        >, and the summary answers
        <span
          markas-text-highlighter
          trigger="manual"
          [active]="active()"
          color="danger"
          delay="500"
          >one clear question</span
        >.
      </p>
      <div class="flex gap-2">
        <button type="button" [class]="primary" (click)="active.set(true)">
          Highlight
        </button>
        <button type="button" [class]="outline" (click)="active.set(false)">
          Reset
        </button>
      </div>
    </div>
  `,
})
export default class TextHighlighterManualExample {
  protected readonly primary =
    "inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  protected readonly outline =
    "inline-flex h-9 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  readonly active = signal(false);
}
