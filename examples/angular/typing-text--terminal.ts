import { Component } from "@angular/core";
import { TypingText } from "../../components/typing-text/typing-text.component";

@Component({
  selector: "markas-example",
  imports: [TypingText],
  template: `
    <div class="overflow-hidden rounded-xl border border-line bg-surface">
      <div class="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span class="size-2.5 rounded-full bg-danger"></span>
        <span class="size-2.5 rounded-full bg-warning"></span>
        <span class="size-2.5 rounded-full bg-success"></span>
      </div>
      <p class="p-4 font-mono text-sm text-ink">
        <span class="text-muted">$&ngsp;</span
        ><span
          markas-typing-text
          [words]="words"
          [loop]="false"
          typeSpeed="50"
        ></span>
      </p>
    </div>
  `,
})
export default class TypingTextTerminalExample {
  protected readonly words = ["pnpm dlx markasui add marquee"];
}
