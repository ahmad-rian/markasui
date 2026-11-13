import { Component } from "@angular/core";
import { Checkbox } from "../../components/checkbox/checkbox.component";

@Component({
  selector: "markas-example",
  imports: [Checkbox],
  template: `
    <fieldset class="min-w-0">
      <legend class="mb-3 text-sm font-medium text-ink">Email me when</legend>
      <div class="grid gap-4">
        <markas-checkbox
          name="comments"
          label="Someone comments"
          description="Replies to your posts and threads you follow."
          checked
        />
        <markas-checkbox
          name="mentions"
          label="Someone mentions me"
          description="Any message that includes your username."
          checked
        />
        <markas-checkbox
          name="invites"
          label="I am invited to a project"
          description="Includes invitations from outside your workspace."
        />
      </div>
    </fieldset>
  `,
})
export default class CheckboxListExample {}
