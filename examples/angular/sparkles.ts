import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Sparkles } from "../../components/sparkles/sparkles.component";

@Component({
  selector: "markas-example",
  imports: [Button, Sparkles],
  template: `
    <div
      markas-sparkles
      density="36"
      class="rounded-xl border border-line bg-surface px-6 py-12"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <p class="text-sm font-medium text-muted">Setup complete</p>
        <h2 class="text-2xl font-semibold text-balance text-ink">
          Your workspace is ready
        </h2>
        <p class="max-w-80 text-sm text-muted">
          We imported 3 repositories and 12 teammates. Time to ship something.
        </p>
        <button markas-button>Open dashboard</button>
      </div>
    </div>
  `,
})
export default class SparklesExample {}
