import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { GridPattern } from "../../components/grid-pattern/grid-pattern.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, GridPattern, Input],
  template: `
    <div
      markas-grid-pattern
      [cellSize]="24"
      mask="linear"
      [cells]="cells"
      class="rounded-xl border border-line bg-surface p-6"
    >
      <form class="grid gap-4">
        <div class="grid gap-1.5">
          <h3 class="text-lg font-semibold text-ink">Get the changelog</h3>
          <p class="text-sm text-muted">
            One short email when we ship something new. No spam.
          </p>
        </div>
        <div class="flex items-end gap-2">
          <markas-input
            label="Email"
            type="email"
            placeholder="you&#64;company.com"
            class="flex-1"
          />
          <button markas-button type="submit">Subscribe</button>
        </div>
      </form>
    </div>
  `,
})
export default class GridPatternSignupExample {
  protected readonly cells: [number, number][] = [
    [13, 0],
    [16, 1],
    [18, 0],
  ];
}
