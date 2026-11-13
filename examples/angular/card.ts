import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Card } from "../../components/card/card.component";

@Component({
  selector: "markas-example",
  imports: [Button, Card],
  template: `
    <article
      markas-card
      title="Pro plan"
      description="For small teams that are growing."
    >
      Includes 10 team members, 50 GB of storage, and monthly reports.
      <ng-container footer>
        <button markas-button size="sm">Choose plan</button>
        <button markas-button variant="ghost" size="sm">Compare</button>
      </ng-container>
    </article>
  `,
})
export default class CardExample {}
