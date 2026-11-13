import { Component } from "@angular/core";
import { Kbd } from "../../components/kbd/kbd.component";

@Component({
  selector: "markas-example",
  imports: [Kbd],
  template: `
    <p class="flex flex-wrap items-center gap-1.5 text-sm text-ink">
      Press <kbd markas-kbd [keys]="['Ctrl', 'K']"></kbd> to search, or
      <kbd markas-kbd>Esc</kbd> to close.
    </p>
  `,
})
export default class KbdExample {}
