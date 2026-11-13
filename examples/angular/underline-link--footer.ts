import { Component } from "@angular/core";
import { UnderlineLink } from "../../components/underline-link/underline-link.component";

@Component({
  selector: "markas-example",
  imports: [UnderlineLink],
  template: `
    <footer
      class="grid grid-cols-2 gap-6 rounded-xl border border-line bg-surface p-6 text-sm"
    >
      @for (group of groups; track group.title) {
        <div>
          <p class="font-medium text-ink">{{ group.title }}</p>
          <ul class="mt-3 grid gap-2 text-muted">
            @for (link of group.links; track link) {
              <li>
                <a markas-underline-link href="#" variant="slide">{{ link }}</a>
              </li>
            }
          </ul>
        </div>
      }
    </footer>
  `,
})
export default class UnderlineLinkFooterExample {
  protected readonly groups = [
    { title: "Product", links: ["Components", "Templates", "Changelog"] },
    { title: "Community", links: ["GitHub", "Discord", "Showcase"] },
  ];
}
