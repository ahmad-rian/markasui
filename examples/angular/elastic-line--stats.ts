import { Component } from "@angular/core";
import { ElasticLine } from "../../components/elastic-line/elastic-line.component";

@Component({
  selector: "markas-example",
  imports: [ElasticLine],
  template: `
    <div [class]="row">
      <div [class]="stat">
        <p [class]="value">61</p>
        <p [class]="label">Components</p>
      </div>
      <markas-elastic-line variant="push" orientation="vertical" [reach]="12" />
      <div [class]="stat">
        <p [class]="value">3</p>
        <p [class]="label">Frameworks</p>
      </div>
      <markas-elastic-line variant="push" orientation="vertical" [reach]="12" />
      <div [class]="stat">
        <p [class]="value">12k</p>
        <p [class]="label">Weekly installs</p>
      </div>
    </div>
  `,
})
export default class ElasticLineStatsExample {
  protected readonly row = "flex rounded-xl border border-line bg-surface py-5";
  protected readonly stat = "flex-1 text-center";
  protected readonly value = "text-2xl font-semibold text-ink tabular-nums";
  protected readonly label = "mt-1 text-sm text-muted";
}
