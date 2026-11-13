import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Tooltip } from "../../components/tooltip/tooltip.component";

@Component({
  selector: "markas-example",
  imports: [Button, Tooltip],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-3 py-10">
      <markas-tooltip content="Shown above the button">
        <button markas-button variant="secondary">Top</button>
      </markas-tooltip>
      <markas-tooltip content="Shown below the button" side="bottom">
        <button markas-button variant="secondary">Bottom</button>
      </markas-tooltip>
    </div>
  `,
})
export default class TooltipSidesExample {}
