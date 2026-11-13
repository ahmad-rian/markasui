import { Component } from "@angular/core";
import { Avatar } from "../../components/avatar/avatar.component";
import { HoverCard } from "../../components/hover-card/hover-card.component";

@Component({
  selector: "markas-example",
  imports: [Avatar, HoverCard],
  template: `
    <div class="flex items-center justify-center gap-3 py-6">
      <markas-hover-card>
        <a href="https://github.com/dewilestari" [class]="link">
          <markas-avatar name="Dewi Lestari" />
        </a>
        <div content class="grid gap-1">
          <p class="font-medium text-ink">Dewi Lestari</p>
          <p class="text-muted">
            Product designer. Leads the design system team.
          </p>
        </div>
      </markas-hover-card>
      <markas-hover-card>
        <a href="https://github.com/budisantoso" [class]="link">
          <markas-avatar name="Budi Santoso" />
        </a>
        <div content class="grid gap-1">
          <p class="font-medium text-ink">Budi Santoso</p>
          <p class="text-muted">
            Backend engineer. Maintains the registry and CLI.
          </p>
        </div>
      </markas-hover-card>
    </div>
  `,
})
export default class HoverCardAvatarExample {
  protected readonly link =
    "inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
}
