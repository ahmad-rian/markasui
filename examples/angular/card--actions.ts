import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Card } from "../../components/card/card.component";

@Component({
  selector: "markas-example",
  imports: [Button, Card],
  template: `
    <article
      markas-card
      title="Delete project"
      description="This removes the project, its files, and all deployments. This cannot be undone."
    >
      <p class="text-muted">
        Project: <span class="font-medium text-ink">marketing-site</span>
      </p>
      <ng-container footer>
        <button markas-button variant="secondary" size="sm" class="ml-auto">
          Cancel
        </button>
        <button markas-button variant="danger" size="sm">Delete project</button>
      </ng-container>
    </article>
  `,
})
export default class CardActionsExample {}
