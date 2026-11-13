import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Popover } from "../../components/popover/popover.component";

@Component({
  selector: "markas-example",
  imports: [Button, Popover],
  template: `
    <div class="flex justify-center pt-40">
      <markas-popover label="Set status" side="top" align="center">
        <div class="grid gap-2">
          <p class="font-medium text-ink">Your status</p>
          <p class="text-muted">Teammates see your status next to your name.</p>
          <div class="flex gap-2">
            <button markas-button size="sm" variant="secondary">Busy</button>
            <button markas-button size="sm" variant="secondary">Away</button>
          </div>
        </div>
      </markas-popover>
    </div>
  `,
})
export default class PopoverTopExample {}
