import { Component } from "@angular/core";
import { TextHighlighter } from "../../components/text-highlighter/text-highlighter.component";

@Component({
  selector: "markas-example",
  imports: [TextHighlighter],
  template: `
    <ul class="grid gap-3 text-base font-medium text-ink">
      <li>
        <a href="#" [class]="link"
          ><span markas-text-highlighter trigger="hover" duration="400"
            >Left to right</span
          ></a
        >
      </li>
      <li>
        <a href="#" [class]="link"
          ><span
            markas-text-highlighter
            trigger="hover"
            direction="rtl"
            color="success"
            duration="400"
            >Right to left</span
          ></a
        >
      </li>
      <li>
        <a href="#" [class]="link"
          ><span
            markas-text-highlighter
            trigger="hover"
            direction="ttb"
            color="danger"
            duration="400"
            >Top to bottom</span
          ></a
        >
      </li>
      <li>
        <a href="#" [class]="link"
          ><span
            markas-text-highlighter
            trigger="hover"
            direction="btt"
            color="primary"
            duration="400"
            >Bottom to top</span
          ></a
        >
      </li>
    </ul>
  `,
})
export default class TextHighlighterDirectionsExample {
  protected readonly link =
    "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
}
