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
        rows="3"
        placeholder="Tell us a little about yourself"
        hint="Shown on your public profile."
      />
      <markas-textarea
        name="reason"
        label="Reason for refund"
        rows="3"
        value="Wrong size"
        error="Please describe the issue in at least 20 characters."
      />
      <markas-textarea
        name="notes"
        label="Internal notes"
        rows="3"
        value="Customer upgraded to the Pro plan on 3 March."
        disabled
      />
    </div>
  `,
})
export default class TextareaStatesExample {}
