import { Component } from "@angular/core";
import { ElasticLine } from "../../components/elastic-line/elastic-line.component";

@Component({
  selector: "markas-example",
  imports: [ElasticLine],
  template: `
    <div [class]="wrap">
      <section [class]="section">
        <h3 [class]="title">Release 2.4</h3>
        <p [class]="text">Stacking cards, pixel trails, and a faster CLI.</p>
      </section>
      <markas-elastic-line />
      <section [class]="section">
        <h3 [class]="title">Release 2.3</h3>
        <p [class]="text">Indonesian docs and Rupiah currency input.</p>
      </section>
    </div>
  `,
})
export default class ElasticLineExample {
  protected readonly wrap =
    "grid rounded-xl border border-line bg-surface px-6 py-4";
  protected readonly section = "py-2";
  protected readonly title = "text-base font-semibold text-ink";
  protected readonly text = "mt-1 text-sm text-muted";
}
