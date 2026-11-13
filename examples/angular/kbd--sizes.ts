import { Component } from "@angular/core";
import { Kbd } from "../../components/kbd/kbd.component";

@Component({
  selector: "markas-example",
  imports: [Kbd],
  template: `
    <div class="flex flex-wrap items-center gap-6">
      <div class="flex items-center gap-2">
        <kbd markas-kbd size="sm">Enter</kbd>
        <kbd markas-kbd size="sm" [keys]="['Shift', 'Tab']"></kbd>
      </div>
      <div class="flex items-center gap-2">
        <kbd markas-kbd>Enter</kbd>
        <kbd markas-kbd [keys]="['Shift', 'Tab']"></kbd>
      </div>
    </div>
  `,
})
export default class KbdSizesExample {}
