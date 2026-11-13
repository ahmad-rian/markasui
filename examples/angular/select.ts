import { Component, signal } from "@angular/core";
import { Select } from "../../components/select/select.component";

@Component({
  selector: "markas-example",
  imports: [Select],
  template: `
    <div class="grid gap-4">
      <markas-select
        [(value)]="city"
        name="city"
        label="City"
        hint="Choose your city."
      >
        <option value="jakarta">Jakarta</option>
        <option value="bandung">Bandung</option>
        <option value="surabaya">Surabaya</option>
      </markas-select>
      <markas-select
        [(value)]="role"
        name="role"
        label="Role"
        error="Role is required."
      >
        <option value="">Choose a role</option>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
      </markas-select>
      <markas-select [(value)]="plan" name="plan" label="Plan" disabled>
        <option value="free">Free</option>
      </markas-select>
    </div>
  `,
})
export default class SelectExample {
  readonly city = signal("bandung");
  readonly role = signal("");
  readonly plan = signal("free");
}
