import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { ShimmerButton } from "../../components/shimmer-button/shimmer-button.component";

@Component({
  selector: "markas-example",
  imports: [Button, ShimmerButton],
  template: `
    <section
      class="grid justify-items-center gap-5 rounded-xl border border-line bg-surface px-6 py-10 text-center"
    >
      <span
        class="rounded-full border border-line bg-subtle px-3 py-1 text-xs font-medium text-muted"
      >
        Version 2.0 is out
      </span>
      <div class="grid gap-2">
        <h2 class="text-2xl font-semibold text-ink">
          Ship your dashboard this week
        </h2>
        <p class="text-sm text-muted">
          Copy the components you need. Own every line of code.
        </p>
      </div>
      <div class="flex flex-wrap justify-center gap-3">
        <button markas-shimmer-button>Start building</button>
        <button markas-button variant="ghost">Read the docs</button>
      </div>
    </section>
  `,
})
export default class ShimmerButtonHeroExample {}
