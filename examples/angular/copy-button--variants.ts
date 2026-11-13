import { Component } from "@angular/core";
import { CopyButton } from "../../components/copy-button/copy-button.component";

@Component({
  selector: "markas-example",
  imports: [CopyButton],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3">
      <markas-copy-button text="INV-2048">Copy</markas-copy-button>
      <markas-copy-button text="INV-2048" variant="secondary">
        Copy ID
      </markas-copy-button>
      <markas-copy-button text="INV-2048" variant="ghost">
        Copy
      </markas-copy-button>
      <markas-copy-button
        text="INV-2048"
        variant="secondary"
        copyLabel="Copy ID"
      />
    </div>
  `,
})
export default class CopyButtonVariantsExample {}
