import { Component } from "@angular/core";
import { Combobox } from "../../components/combobox/combobox.component";

@Component({
  selector: "markas-example",
  imports: [Combobox],
  template: `
    <markas-combobox
      name="country"
      label="Country"
      placeholder="Search countries"
      hint="Start typing to filter the list."
      [options]="countries"
    />
  `,
})
export default class ComboboxExample {
  protected readonly countries = [
    { value: "au", label: "Australia" },
    { value: "id", label: "Indonesia" },
    { value: "jp", label: "Japan" },
    { value: "my", label: "Malaysia" },
    { value: "ph", label: "Philippines" },
    { value: "sg", label: "Singapore" },
    { value: "th", label: "Thailand" },
    { value: "vn", label: "Vietnam" },
  ];
}
