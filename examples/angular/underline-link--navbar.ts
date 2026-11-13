import { Component } from "@angular/core";
import { UnderlineLink } from "../../components/underline-link/underline-link.component";

@Component({
  selector: "markas-example",
  imports: [UnderlineLink],
  template: `
    <header
      class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3"
    >
      <span class="text-sm font-semibold text-ink">Kopi Kita</span>
      <nav
        aria-label="Main"
        class="flex items-center gap-5 text-sm font-medium text-muted"
      >
        <a
          markas-underline-link
          href="#"
          variant="comes-in-goes-out"
          active
          class="text-ink"
          >Menu</a
        >
        @for (link of links; track link) {
          <a
            markas-underline-link
            href="#"
            variant="comes-in-goes-out"
            class="hover:text-ink"
            >{{ link }}</a
          >
        }
      </nav>
    </header>
  `,
})
export default class UnderlineLinkNavbarExample {
  protected readonly links = ["Outlets", "Rewards", "About"];
}
