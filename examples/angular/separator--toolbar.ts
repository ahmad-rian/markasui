import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Separator } from "../../components/separator/separator.component";

@Component({
  selector: "markas-example",
  imports: [Button, Separator],
  template: `
    <div
      class="inline-flex items-center gap-1 rounded-lg border border-line bg-surface p-1"
    >
      <button markas-button variant="ghost" size="sm">Bold</button>
      <button markas-button variant="ghost" size="sm">Italic</button>
      <div markas-separator orientation="vertical" class="mx-1 my-1"></div>
      <button markas-button variant="ghost" size="sm">Link</button>
      <button markas-button variant="ghost" size="sm">Image</button>
      <div markas-separator orientation="vertical" class="mx-1 my-1"></div>
      <button markas-button variant="ghost" size="sm">Undo</button>
    </div>
  `,
})
export default class SeparatorToolbarExample {}
