import { Component } from "@angular/core";
import { TextScramble } from "../../components/text-scramble/text-scramble.component";

@Component({
  selector: "markas-example",
  imports: [TextScramble],
  template: `
    <div class="rounded-xl border border-line bg-surface p-6">
      <p class="text-sm text-muted">Project codename</p>
      <h2 class="mt-1 text-3xl font-semibold tracking-tight text-ink">
        <span
          markas-text-scramble
          text="Operation Nusantara"
          trigger="view"
        ></span>
      </h2>
      <a
        href="#"
        class="mt-4 inline-flex h-9 items-center rounded-lg border border-line px-3 font-mono text-sm text-ink hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span
          markas-text-scramble
          text="Open the brief"
          charset="symbols"
        ></span>
      </a>
    </div>
  `,
})
export default class TextScrambleExample {}
