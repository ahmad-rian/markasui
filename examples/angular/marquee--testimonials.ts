import { Component } from "@angular/core";
import { Marquee } from "../../components/marquee/marquee.component";

@Component({
  selector: "markas-example",
  imports: [Marquee],
  template: `
    <div markas-marquee duration="30">
      @for (quote of quotes; track quote.name) {
        <figure class="w-60 rounded-xl border border-line bg-surface p-4">
          <blockquote class="text-sm text-ink">{{ quote.text }}</blockquote>
          <figcaption class="mt-3 text-xs text-muted">
            <span class="font-medium text-ink">{{ quote.name }}</span
            >,
            {{ quote.role }}
          </figcaption>
        </figure>
      }
    </div>
  `,
})
export default class MarqueeTestimonialsExample {
  protected readonly quotes = [
    {
      name: "Dewi Lestari",
      role: "Product designer",
      text: "Our Blade and React apps finally look the same.",
    },
    {
      name: "John Carter",
      role: "Frontend lead",
      text: "Copy, paste, ship. No wrapper library to fight.",
    },
    {
      name: "Siti Aminah",
      role: "Indie maker",
      text: "The dark mode tokens saved me a whole weekend.",
    },
  ];
}
