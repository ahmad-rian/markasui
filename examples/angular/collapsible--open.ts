import { Component } from "@angular/core";
import { Collapsible } from "../../components/collapsible/collapsible.component";

@Component({
  selector: "markas-example",
  imports: [Collapsible],
  template: `
    <details markas-collapsible title="Release notes" open>
      Faster search, a new export to PDF, and fixes for date filters in reports.
    </details>
  `,
})
export default class CollapsibleOpenExample {}
