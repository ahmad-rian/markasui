import { Component } from "@angular/core";
import { UnderlineLink } from "../../components/underline-link/underline-link.component";

@Component({
  selector: "markas-example",
  imports: [UnderlineLink],
  template: `
    <ul class="grid gap-3 text-base font-medium text-ink">
      <li><a markas-underline-link href="#">Grow from the center</a></li>
      <li>
        <a markas-underline-link href="#" variant="slide">
          Slide in from the left
        </a>
      </li>
      <li>
        <a markas-underline-link href="#" variant="comes-in-goes-out">
          Comes in, goes out
        </a>
      </li>
      <li>
        <a markas-underline-link href="#" variant="goes-out-comes-in">
          Goes out, comes in
        </a>
      </li>
      <li>
        <a markas-underline-link href="#" variant="scribble">Drawn by hand</a>
      </li>
    </ul>
  `,
})
export default class UnderlineLinkExample {}
