import { Component } from "@angular/core";
import { Textarea } from "../../components/textarea/textarea.component";

@Component({
  selector: "markas-example",
  imports: [Textarea],
  template: `
    <div class="grid gap-4">
      <markas-textarea
        name="bio"
        label="Short bio"
        placeholder="Tell us a little about yourself"
        hint="Up to 200 characters."
      />
      <markas-textarea
        name="address"
        label="Address"
        rows="2"
        value="12 Main Street"
        error="Address is incomplete."
      />
    </div>
  `,
})
export default class TextareaExample {}
