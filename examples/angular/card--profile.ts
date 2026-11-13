import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";
import { Button } from "../../components/button/button.component";
import { Card } from "../../components/card/card.component";

@Component({
  selector: "markas-example",
  imports: [Avatar, Button, Card],
  template: `
    <article markas-card class="mx-auto max-w-sm">
      <div class="flex items-center gap-4">
        <markas-avatar name="Sarah Miller" size="lg" alt="" />
        <div class="grid gap-0.5">
          <h3 class="text-base font-semibold text-ink">Sarah Miller</h3>
          <p class="text-muted">Product designer at MarkasUI</p>
        </div>
      </div>
      <p class="mt-4 text-muted">
        Designs onboarding flows and keeps the component library tidy.
      </p>
      <ng-container footer>
        <button markas-button size="sm">Message</button>
        <button markas-button variant="secondary" size="sm">
          View profile
        </button>
      </ng-container>
    </article>
  `,
})
export default class CardProfileExample {}
