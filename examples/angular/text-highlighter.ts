import { Component } from "@angular/core";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

@Component({
  selector: "markas-example",
  imports: [TextHighlighter],
  template: `
    <article class="text-base leading-7 text-muted">
      <h3 class="text-lg font-semibold text-ink">Set the measure first</h3>
      <p class="mt-2">
        Long lines tire the eye, so readers lose their place on the way back.
        Keep body text at
        <span markas-text-highlighter>45 to 75 characters</span> per line, give
        it a
        <span markas-text-highlighter delay="400">line height near 1.5</span>,
        and let headings sit
        <span markas-text-highlighter delay="800"
          >closer to the text they introduce</span
        >
        than to the one above.
      </p>
    </article>
  `,
})
export default class TextHighlighterExample {}
