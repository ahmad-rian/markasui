import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Popover } from "../../components/popover/popover.component";

@Component({
  selector: "markas-example",
  imports: [Button, Popover],
  template: `
    <markas-popover label="Share">
      <div class="grid gap-3">
        <div class="grid gap-1">
          <p class="font-medium text-ink">Share project</p>
          <p class="text-muted">Anyone with the link can view this project.</p>
        </div>
        <button markas-button size="sm">Copy link</button>
      </div>
    </markas-popover>
  `,
})
export default class PopoverExample {}
