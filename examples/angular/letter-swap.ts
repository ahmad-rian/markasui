import { Component } from "@angular/core";
import { LetterSwap } from "../../components/letter-swap/letter-swap.component";

@Component({
  selector: "markas-example",
  imports: [LetterSwap],
  template: `
    <header
      class="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3"
    >
      <span class="text-sm font-semibold text-ink">Markas</span>
      <nav
        aria-label="Main"
        class="flex items-center gap-5 text-sm font-medium text-muted"
      >
        <a
          href="#"
          class="rounded-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span markas-letter-swap text="Products"></span>
        </a>
        <a
          href="#"
          class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span markas-letter-swap text="Pricing"></span>
        </a>
        <a
          href="#"
          class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span markas-letter-swap text="Docs"></span>
        </a>
        <a
          href="#"
          class="rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span markas-letter-swap text="Blog"></span>
        </a>
      </nav>
    </header>
  `,
})
export default class LetterSwapExample {}
