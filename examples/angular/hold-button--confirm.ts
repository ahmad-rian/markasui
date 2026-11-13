import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { HoldButton } from "../../components/hold-button/hold-button.component";

@Component({
  selector: "markas-example",
  imports: [Button, HoldButton],
  template: `
    <div class="grid gap-4 rounded-xl border border-line bg-surface p-6">
      <div class="grid gap-1">
        <p class="text-base font-semibold text-ink">Delete workspace</p>
        <p class="text-sm text-muted">
          This removes 12 projects and 48 members. It cannot be undone.
        </p>
      </div>
      <div class="flex flex-wrap justify-end gap-2">
        <button markas-button variant="secondary">Cancel</button>
        <markas-hold-button variant="danger" [duration]="2000">
          Hold to delete
        </markas-hold-button>
      </div>
    </div>
  `,
})
export default class HoldButtonConfirmExample {}
