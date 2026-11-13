import { Component } from "@angular/core";
import { StackingCards } from "../../components/stacking-cards/stacking-cards.component";

@Component({
  selector: "markas-example",
  imports: [StackingCards],
  template: `
    <section tabindex="0" aria-label="Testimonials" [class]="scroller">
      <div [class]="intro">
        <h3 [class]="title">Loved by teams across Indonesia</h3>
      </div>
      <markas-stacking-cards [top]="0" [offset]="24" [class]="stack">
        @for (quote of quotes; track quote.name) {
          <figure [class]="quote.card">
            <blockquote [class]="quoteText">{{ quote.text }}</blockquote>
            <figcaption [class]="quote.meta">
              <span [class]="author">{{ quote.name }}</span
              >, {{ quote.role }}
            </figcaption>
          </figure>
        }
      </markas-stacking-cards>
    </section>
  `,
})
export default class StackingCardsTestimonialsExample {
  protected readonly scroller =
    "h-96 overflow-y-auto rounded-xl border border-line bg-surface px-4 pb-48 focus-visible:outline-2 focus-visible:outline-primary";
  protected readonly intro = "py-6";
  protected readonly title = "text-lg font-semibold text-ink";
  protected readonly stack = "gap-4";
  protected readonly quotes = [
    {
      text: "We shipped our checkout in Blade and the admin in Vue with the same buttons. Nobody noticed the seams.",
      name: "Rania Putri",
      role: "Founder, Bandung",
      card: "grid h-56 content-between rounded-xl bg-primary p-6 text-on-primary",
      meta: "text-sm text-on-primary/80",
    },
    {
      text: "Dark mode took one afternoon because every color is a token.",
      name: "Dimas Pratama",
      role: "CTO, Jakarta",
      card: "grid h-56 content-between rounded-xl border border-primary-line bg-primary-soft p-6 text-ink",
      meta: "text-sm text-muted",
    },
    {
      text: "Keyboard support was already there, so our audit came back clean.",
      name: "Sekar Ayu",
      role: "Designer, Yogyakarta",
      card: "grid h-56 content-between rounded-xl border border-line bg-subtle p-6 text-ink",
      meta: "text-sm text-muted",
    },
  ];
  protected readonly quoteText = "text-lg font-medium";
  protected readonly author = "font-semibold";
}
