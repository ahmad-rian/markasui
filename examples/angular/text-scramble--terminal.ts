import { Component } from "@angular/core";
import { TextScramble } from "../../components/text-scramble/text-scramble.component";

@Component({
  selector: "markas-example",
  imports: [TextScramble],
  template: `
    <div class="rounded-xl border border-line bg-surface p-5 font-mono text-sm">
      <p class="text-muted">$ markas auth --token</p>
      <p class="mt-2 text-ink">
        Handshake
        <span
          markas-text-scramble
          text="0110 1011 0010"
          trigger="mount"
          charset="binary"
          duration="1200"
        ></span>
      </p>
      <p class="mt-1 flex items-center gap-2 font-semibold text-ink">
        <span aria-hidden="true" class="size-2 rounded-full bg-success"></span>
        <span
          markas-text-scramble
          text="Access granted"
          trigger="mount"
          charset="symbols"
          duration="900"
          delay="600"
        ></span>
      </p>
    </div>
  `,
})
export default class TextScrambleTerminalExample {}
