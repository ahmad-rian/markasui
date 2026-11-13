import { Component } from "@angular/core";
import { Badge } from "../../components/badge/badge.component";
import { Card } from "../../components/card/card.component";

@Component({
  selector: "markas-example",
  imports: [Badge, Card],
  template: `
    <div class="grid grid-cols-2 gap-4">
      <article markas-card>
        <p class="text-muted">Total revenue</p>
        <p class="mt-1 text-2xl font-semibold text-ink">$48,250</p>
        <div class="mt-3 flex items-center gap-2">
          <span markas-badge variant="success">+12.5%</span>
          <span class="text-xs text-muted">vs last month</span>
        </div>
      </article>
      <article markas-card>
        <p class="text-muted">Active users</p>
        <p class="mt-1 text-2xl font-semibold text-ink">1,284</p>
        <div class="mt-3 flex items-center gap-2">
          <span markas-badge variant="danger">-3.2%</span>
          <span class="text-xs text-muted">vs last month</span>
        </div>
      </article>
    </div>
  `,
})
export default class CardStatsExample {}
