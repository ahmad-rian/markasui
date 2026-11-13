import { Component } from "@angular/core";
import { CopyButton } from "../../components/copy-button/copy-button.component";

@Component({
  selector: "markas-example",
  imports: [CopyButton],
  template: `
    <div class="grid gap-2">
      <p class="text-sm font-medium text-ink">Secret key</p>
      <div class="flex gap-2">
        <input
          aria-label="Secret key"
          readonly
          value="sk_live_51Hx9aT2eZvKYlo2C"
          class="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 font-mono text-sm text-ink"
        />
        <markas-copy-button
          text="sk_live_51Hx9aT2eZvKYlo2C"
          variant="secondary"
        >
          Copy key
        </markas-copy-button>
      </div>
      <p class="text-sm text-muted">
        Keep this key private. It grants full access to your account.
      </p>
    </div>
  `,
})
export default class CopyButtonApiKeyExample {}
