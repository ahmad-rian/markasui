import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { PixelTrail } from "../../components/pixel-trail/pixel-trail.component";

@Component({
  selector: "markas-example",
  imports: [Button, PixelTrail],
  template: `
    <markas-pixel-trail color="ink" [cellSize]="8" [fade]="400" [class]="bar">
      <span [class]="brand">Markas</span>
      <nav aria-label="Main">
        <ul [class]="links">
          @for (page of pages; track page.label) {
            <li>
              <a [attr.href]="page.href" [class]="link">{{ page.label }}</a>
            </li>
          }
        </ul>
      </nav>
      <button markas-button size="sm">Sign in</button>
    </markas-pixel-trail>
  `,
})
export default class PixelTrailNavbarExample {
  protected readonly bar =
    "flex h-16 items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4";
  protected readonly brand = "text-base font-semibold text-ink";
  protected readonly links = "flex gap-4 text-sm text-muted";
  protected readonly link =
    "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  protected readonly pages = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates" },
  ];
}
