import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { Popover } from "../../components/popover/popover.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, Popover],
  template: `
    <div class="flex justify-center">
      <markas-popover label="Dimensions" align="center">
        <form class="grid gap-3">
          <p class="font-medium text-ink">Image size</p>
          <div class="grid grid-cols-2 gap-3">
            <markas-input name="width" label="Width" placeholder="1200" />
            <markas-input name="height" label="Height" placeholder="630" />
          </div>
          <button markas-button type="submit" size="sm">Apply</button>
        </form>
      </markas-popover>
    </div>
  `,
})
export default class PopoverFormExample {}
