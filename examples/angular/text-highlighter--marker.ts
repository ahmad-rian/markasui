import { Component } from "@angular/core";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

@Component({
  selector: "markas-example",
  imports: [TextHighlighter],
  template: `
    <div class="py-4 text-center">
      <h2 class="text-4xl leading-tight font-semibold tracking-tight text-ink">
        Ship your
        <span markas-text-highlighter variant="marker" duration="900"
          >design system</span
        >
        before the next sprint
      </h2>
      <p class="mx-auto mt-4 max-w-sm text-base leading-7 text-muted">
        One set of components for Blade, React, and Vue, with tokens your team
        already knows.
      </p>
    </div>
  `,
})
export default class TextHighlighterMarkerExample {}
