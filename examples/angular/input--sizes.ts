import { Component } from "@angular/core";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Input],
  template: `
    <div class="grid gap-4">
      <markas-input
        name="small"
        label="Small"
        placeholder="Search docs"
        class="h-8! text-xs!"
      />
      <markas-input name="medium" label="Medium" placeholder="Search docs" />
      <markas-input
        name="large"
        label="Large"
        placeholder="Search docs"
        class="h-12! px-4! text-base!"
      />
    </div>
  `,
})
export default class InputSizesExample {}
