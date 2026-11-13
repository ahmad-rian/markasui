import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { AuroraBackground } from "../../components/aurora-background/aurora-background.component";

@Component({
  selector: "markas-example",
  imports: [Button, AuroraBackground],
  template: `
    <div
      markas-aurora-background
      class="rounded-xl border border-line bg-surface px-6 py-14"
    >
      <div class="grid justify-items-center gap-4 text-center">
        <h2 class="text-2xl font-semibold text-balance text-ink">
          Meet your calmer workspace
        </h2>
        <p class="max-w-80 text-sm text-muted">
          Notes, tasks, and docs in one quiet place, synced across every device.
        </p>
        <div class="flex gap-2">
          <button markas-button>Try it free</button>
          <button markas-button variant="ghost">See how it works</button>
        </div>
      </div>
    </div>
  `,
})
export default class AuroraBackgroundFixture {}
