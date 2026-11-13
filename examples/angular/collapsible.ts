import { Component } from "@angular/core";
import { Collapsible } from "../../components/collapsible/collapsible.component";

@Component({
  selector: "markas-example",
  imports: [Collapsible],
  template: `
    <details markas-collapsible title="Show order details">
      Shipped from Jakarta on 4 November with standard delivery. Tracking number
      JKT-2210-884.
    </details>
  `,
})
export default class CollapsibleExample {}
