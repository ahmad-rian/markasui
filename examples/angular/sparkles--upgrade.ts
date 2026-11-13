import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Sparkles } from "../../components/sparkles/sparkles.component";

@Component({
  selector: "markas-example",
  imports: [Button, Sparkles],
  template: `
    <div
      markas-sparkles
      variant="burst"
      density="32"
      size="lg"
      class="rounded-xl border border-line bg-surface px-6 py-10"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h3 class="text-xl font-semibold text-ink">
          You have used 9 of 10 free projects
        </h3>
        <p class="max-w-72 text-sm text-muted">
          Upgrade for unlimited projects, custom domains, and team roles.
        </p>
        <button markas-button>Upgrade now</button>
      </div>
    </div>
  `,
})
export default class SparklesUpgradeExample {}
