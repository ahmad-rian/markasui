import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Tooltip } from "../../components/tooltip/tooltip.component";

@Component({
  selector: "markas-example",
  imports: [Button, Tooltip],
  template: `
    <div class="flex justify-center py-10">
      <markas-tooltip content="Copy link to clipboard">
        <button markas-button variant="secondary">Copy link</button>
      </markas-tooltip>
    </div>
  `,
})
export default class TooltipExample {}
