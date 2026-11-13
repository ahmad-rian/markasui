import { Component } from "@angular/core";
import { Textarea } from "../../components/textarea/textarea.component";

@Component({
  selector: "markas-example",
  imports: [Textarea],
  template: `
    <div class="grid gap-4">
      <markas-textarea
        name="headline"
        label="Headline"
        rows="2"
        placeholder="One or two sentences"
      />
      <markas-textarea
        name="description"
        label="Description"
        rows="6"
        placeholder="Describe the change, why it matters, and how to test it"
      />
      <markas-textarea
        name="address"
        label="Shipping address"
        rows="3"
        placeholder="Street, city, postal code"
        class="resize-none"
      />
    </div>
  `,
})
export default class TextareaRowsExample {}
