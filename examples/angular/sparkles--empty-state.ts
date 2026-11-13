import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Sparkles } from "../../components/sparkles/sparkles.component";

@Component({
  selector: "markas-example",
  imports: [Button, Sparkles],
  template: `
    <div
      markas-sparkles
      color="success"
      size="sm"
      density="20"
      seed="9"
      class="rounded-xl border border-dashed border-line bg-surface px-6 py-10"
    >
      <div class="grid justify-items-center gap-3 text-center">
        <h3 class="text-base font-semibold text-ink">Inbox zero</h3>
        <p class="max-w-64 text-sm text-muted">
          Every review is done. New requests will show up here.
        </p>
        <button markas-button variant="secondary" size="sm">
          View archive
        </button>
      </div>
    </div>
  `,
})
export default class SparklesEmptyStateExample {}
