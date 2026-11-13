import { Component } from "@angular/core";
import { ElasticLine } from "../../components/elastic-line/elastic-line.component";

@Component({
  selector: "markas-example",
  imports: [ElasticLine],
  template: `
    <footer [class]="footer">
      <markas-elastic-line color="muted" [strokeWidth]="1" [reach]="20" />
      <div [class]="row">
        <p>2026 MarkasUI, Bandung</p>
        <nav aria-label="Footer">
          <ul [class]="links">
            @for (page of pages; track page.label) {
              <li>
                <a [href]="page.href" [class]="link">{{ page.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </footer>
  `,
})
export default class ElasticLineFooterExample {
  protected readonly footer = "grid gap-1";
  protected readonly row =
    "flex items-center justify-between gap-4 text-sm text-muted";
  protected readonly links = "flex gap-4";
  protected readonly link =
    "rounded-sm hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  protected readonly pages = [
    { label: "Docs", href: "/docs" },
    { label: "Templates", href: "/templates" },
    { label: "GitHub", href: "https://github.com/markasui/markasui" },
  ];
}
