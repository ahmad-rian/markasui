import { Component } from "@angular/core";
import { HoverCard } from "../../components/hover-card/hover-card.component";

@Component({
  selector: "markas-example",
  imports: [HoverCard],
  template: `
    <div class="text-sm leading-6 text-muted">
      This release was maintained by
      <markas-hover-card>
        <a href="https://github.com/rinawijaya" [class]="link">Rina Wijaya</a>
        <div content class="grid gap-1">
          <p class="font-medium text-ink">Rina Wijaya</p>
          <p class="text-muted">
            Design engineer in Bandung. Works on forms and accessibility.
          </p>
        </div>
      </markas-hover-card>
      with help from 40 contributors.
    </div>
  `,
})
export default class HoverCardInlineExample {
  protected readonly link =
    "rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
}
