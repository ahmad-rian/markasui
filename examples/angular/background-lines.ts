import { Component } from "@angular/core";
import { BackgroundLines } from "../../components/background-lines/background-lines.component";
import { Button } from "../../components/button/button.component";

@Component({
  selector: "markas-example",
  imports: [BackgroundLines, Button],
  template: `
    <div
      markas-background-lines
      class="rounded-xl border border-line bg-surface px-6 py-16"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-4xl font-bold tracking-tight text-ink">
          Ideas in motion
        </h2>
        <p class="max-w-72 text-sm text-muted">
          Sketch, review, and ship product updates in one calm workspace.
        </p>
        <button markas-button>Start sketching</button>
      </div>
    </div>
  `,
})
export default class BackgroundLinesFixture {}
