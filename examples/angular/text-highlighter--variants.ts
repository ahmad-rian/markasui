import { Component } from "@angular/core";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

@Component({
  selector: "markas-example",
  imports: [TextHighlighter],
  template: `
    <ul class="grid gap-3 text-base leading-7 text-muted">
      <li>
        A <span markas-text-highlighter>solid block</span> for quotes worth
        saving.
      </li>
      <li>
        A
        <span
          markas-text-highlighter
          variant="marker"
          color="success"
          delay="150"
          >marker stroke</span
        >
        for notes in the margin.
      </li>
      <li>
        A
        <span
          markas-text-highlighter
          variant="underline"
          color="danger"
          delay="300"
          >thick underline</span
        >
        for terms to remember.
      </li>
      <li>
        A
        <span markas-text-highlighter variant="gradient" delay="450"
          >two tone gradient</span
        >
        for the headline idea.
      </li>
    </ul>
  `,
})
export default class TextHighlighterVariantsExample {}
