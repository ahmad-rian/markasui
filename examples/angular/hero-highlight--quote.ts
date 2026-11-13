import { Component } from "@angular/core";
import { HeroHighlight } from "../../components/hero-highlight/hero-highlight.component";

@Component({
  selector: "markas-example",
  imports: [HeroHighlight],
  template: `
    <div
      markas-hero-highlight
      speed="slow"
      [spacing]="12"
      class="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <figure class="grid gap-4">
        <blockquote class="text-lg leading-relaxed text-ink">
          We rebuilt our dashboard with MarkasUI in a weekend. Blade and React
          screens finally match, and <mark>nobody wants to go back</mark>.
        </blockquote>
        <figcaption class="text-sm text-muted">
          Dana Reyes, Frontend Lead in Jakarta
        </figcaption>
      </figure>
    </div>
  `,
})
export default class HeroHighlightQuoteExample {}
