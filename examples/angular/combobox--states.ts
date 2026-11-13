import { Component } from "@angular/core";
import { Combobox } from "../../components/combobox/combobox.component";

@Component({
  selector: "markas-example",
  imports: [Combobox],
  template: `
    <div class="grid gap-4">
      <markas-combobox
        name="assignee"
        label="Assignee"
        placeholder="Search people"
        hint="Only members of this project are listed."
        [options]="people"
      />
      <markas-combobox
        name="reviewer"
        label="Reviewer"
        placeholder="Search people"
        error="Choose a reviewer before submitting."
        [options]="people"
      />
      <markas-combobox
        name="owner"
        label="Owner"
        value="budi"
        disabled
        [options]="people"
      />
    </div>
  `,
})
export default class ComboboxStatesExample {
  protected readonly people = [
    { value: "ana", label: "Ana Putri" },
    { value: "budi", label: "Budi Santoso" },
    { value: "citra", label: "Citra Lestari" },
  ];
}
