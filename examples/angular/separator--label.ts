import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { Separator } from "../../components/separator/separator.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, Separator],
  template: `
    <div class="space-y-4 rounded-xl border border-line bg-surface p-4">
      <button markas-button variant="secondary" class="w-full">
        Continue with GitHub
      </button>
      <div markas-separator label="or"></div>
      <markas-input type="email" label="Email" placeholder="you@example.com" />
    </div>
  `,
})
export default class SeparatorLabelExample {}
