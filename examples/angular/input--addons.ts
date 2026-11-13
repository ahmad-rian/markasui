import { Component } from "@angular/core";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Input],
  template: `
    <div class="grid gap-4">
      <div class="relative">
        <markas-input
          name="price"
          label="Price"
          placeholder="0.00"
          inputmode="decimal"
          class="pr-14! pl-7!"
        />
        <span [class]="prefix" aria-hidden="true">$</span>
        <span [class]="suffix">USD</span>
      </div>
      <div class="relative">
        <markas-input
          name="website"
          label="Website"
          placeholder="example.com"
          class="pl-21!"
        />
        <span [class]="addon">https://</span>
      </div>
      <div class="relative">
        <markas-input
          name="username"
          label="Username"
          value="budisantoso"
          class="pl-7!"
        />
        <span [class]="prefix" aria-hidden="true">&#64;</span>
      </div>
    </div>
  `,
})
export default class InputAddonsExample {
  protected readonly prefix =
    "pointer-events-none absolute bottom-0 left-3 flex h-10 items-center text-sm text-muted";
  protected readonly suffix =
    "pointer-events-none absolute right-3 bottom-0 flex h-10 items-center text-sm text-muted";
  protected readonly addon =
    "pointer-events-none absolute bottom-0 left-0 flex h-10 items-center border-r border-line px-3 text-sm text-muted";
}
