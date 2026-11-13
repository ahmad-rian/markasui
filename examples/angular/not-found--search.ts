import { Component } from "@angular/core";
import { NotFound } from "../../components/not-found/not-found.component";

@Component({
  selector: "markas-example",
  imports: [NotFound],
  template: `
    <markas-not-found
      variant="search"
      description="Try searching for the page, or pick one of the popular pages below."
      [links]="links"
    />
  `,
})
export default class NotFoundSearchExample {
  protected readonly links = [
    { label: "Documentation", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ];
}
