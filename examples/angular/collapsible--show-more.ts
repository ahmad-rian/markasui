import { Component } from "@angular/core";
import { Collapsible } from "../../components/collapsible/collapsible.component";

@Component({
  selector: "markas-example",
  imports: [Collapsible],
  template: `
    <div class="grid gap-2">
      <p class="text-sm font-medium text-ink">Team members</p>
      <ul class="grid gap-1 text-sm text-muted">
        <li>Rina Kusuma</li>
        <li>Budi Santoso</li>
        <li>Dewi Lestari</li>
      </ul>
      <details markas-collapsible title="Show 3 more">
        <ul class="grid gap-1">
          <li>Agus Pratama</li>
          <li>Sari Wulandari</li>
          <li>Yusuf Hidayat</li>
        </ul>
      </details>
    </div>
  `,
})
export default class CollapsibleShowMoreExample {}
