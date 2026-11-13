import { Component } from "@angular/core";
import { UnderlineLink } from "../../components/underline-link/underline-link.component";

@Component({
  selector: "markas-example",
  imports: [UnderlineLink],
  template: `
    <article class="text-base leading-relaxed text-muted">
      <h3 class="text-lg font-semibold text-ink">Release notes</h3>
      <p class="mt-2">
        This release adds six text effects. Read the
        <a
          markas-underline-link
          href="#"
          variant="scribble"
          class="font-medium text-ink"
          >migration guide</a
        >
        before you upgrade, or browse the
        <a
          markas-underline-link
          href="#"
          variant="goes-out-comes-in"
          class="font-medium text-ink"
          >full changelog</a
        >
        first.
      </p>
    </article>
  `,
})
export default class UnderlineLinkArticleExample {}
