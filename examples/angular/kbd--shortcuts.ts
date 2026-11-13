import { Component } from "@angular/core";
import { Kbd } from "../../components/kbd/kbd.component";

@Component({
  selector: "markas-example",
  imports: [Kbd],
  template: `
    <dl
      class="divide-y divide-line rounded-xl border border-line bg-surface text-sm text-ink"
    >
      <div [class]="row">
        <dt>Search</dt>
        <dd><kbd markas-kbd [keys]="['Ctrl', 'K']"></kbd></dd>
      </div>
      <div [class]="row">
        <dt>New document</dt>
        <dd><kbd markas-kbd [keys]="['Ctrl', 'Alt', 'N']"></kbd></dd>
      </div>
      <div [class]="row">
        <dt>Go to next page</dt>
        <dd><kbd markas-kbd [keys]="['G', 'N']" separator="then"></kbd></dd>
      </div>
      <div [class]="row">
        <dt>Show shortcuts</dt>
        <dd><kbd markas-kbd>?</kbd></dd>
      </div>
    </dl>
  `,
})
export default class KbdShortcutsExample {
  protected readonly row = "flex items-center justify-between gap-4 px-4 py-3";
}
