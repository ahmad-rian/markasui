import { Component } from "@angular/core";
import { ElasticLine } from "../../components/elastic-line/elastic-line.component";

@Component({
  selector: "markas-example",
  imports: [ElasticLine],
  template: `
    <div [class]="wrap">
      <p [class]="eyebrow">New in Markas</p>
      <h3 [class]="title">Build faster, ship calmer</h3>
      <markas-elastic-line
        variant="pluck"
        color="primary"
        [strokeWidth]="3"
        [reach]="16"
        playOnView
        decorative
        [class]="line"
      />
      <p [class]="text">
        Touch the underline and pull: it slips free and vibrates like a string.
      </p>
    </div>
  `,
})
export default class ElasticLineHeadingExample {
  protected readonly wrap = "grid justify-items-start py-4";
  protected readonly eyebrow = "text-sm font-medium text-primary";
  protected readonly title = "mt-1 text-3xl font-semibold text-ink";
  protected readonly line = "w-48";
  protected readonly text = "max-w-80 text-sm text-muted";
}
