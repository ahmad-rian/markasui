import { Component } from "@angular/core";
import { CopyButton } from "../../components/copy-button/copy-button.component";

@Component({
  selector: "markas-example",
  imports: [CopyButton],
  template: `
    <div
      class="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface py-2 pr-2 pl-4"
    >
      <code class="font-mono text-sm text-ink">
        pnpm dlx markasui add button
      </code>
      <markas-copy-button
        text="pnpm dlx markasui add button"
        variant="ghost"
        size="sm"
        copyLabel="Copy command"
      />
    </div>
  `,
})
export default class CopyButtonExample {}
