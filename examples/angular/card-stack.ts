import { Component } from "@angular/core";
import { CardStack } from "../../components/card-stack/card-stack.component";

@Component({
  selector: "markas-example",
  imports: [CardStack],
  template: `
    <markas-card-stack label="Customer testimonials" [items]="testimonials">
      <ng-template let-item>
        <figure [class]="card">
          <blockquote [class]="quote">{{ item.quote }}</blockquote>
          <figcaption [class]="person">
            <span aria-hidden="true" [class]="avatar">{{ item.initials }}</span>
            <span [class]="meta">
              <span [class]="name">{{ item.name }}</span>
              <span [class]="role">{{ item.role }}</span>
            </span>
          </figcaption>
        </figure>
      </ng-template>
    </markas-card-stack>
  `,
})
export default class CardStackExample {
  protected readonly card = "grid h-full content-between gap-6 p-5";
  protected readonly quote = "text-base text-ink";
  protected readonly person = "flex items-center gap-3";
  protected readonly avatar =
    "inline-flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-medium text-ink";
  protected readonly meta = "grid";
  protected readonly name = "text-sm font-medium text-ink";
  protected readonly role = "text-sm text-muted";
  protected readonly testimonials = [
    {
      quote:
        "We replaced three internal UI kits with MarkasUI. New hires ship their first screen in an afternoon.",
      name: "Maya Putri",
      initials: "MP",
      role: "Engineering lead, Jakarta",
    },
    {
      quote:
        "Same class names in Blade and React, so our Laravel pages and the React app finally match.",
      name: "Daniel Reyes",
      initials: "DR",
      role: "Laravel developer, Surabaya",
    },
    {
      quote:
        "Copy, paste, adjust the tokens. Setup took ten minutes and the docs answered the rest.",
      name: "Sari Wijaya",
      initials: "SW",
      role: "CTO, Bandung",
    },
    {
      quote:
        "Finally a component library our designers and engineers both enjoy opening on Monday.",
      name: "Tom Becker",
      initials: "TB",
      role: "Design engineer, Berlin",
    },
  ];
}
