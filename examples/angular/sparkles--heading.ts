import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Sparkles } from "../../components/sparkles/sparkles.component";

@Component({
  selector: "markas-example",
  imports: [Button, Sparkles],
  template: `
    <div
      class="grid justify-items-center gap-4 rounded-xl border border-line bg-surface px-6 py-10 text-center"
    >
      <div
        markas-sparkles
        variant="text"
        density="18"
        size="sm"
        class="px-6 py-4"
      >
        <h3 class="text-3xl font-semibold tracking-tight text-ink">
          Meet MarkasUI Pro
        </h3>
      </div>
      <p class="max-w-72 text-sm text-muted">
        Every component, every template, and early access to what we build next.
      </p>
      <button markas-button>See what is new</button>
    </div>
  `,
})
export default class SparklesHeadingExample {}
