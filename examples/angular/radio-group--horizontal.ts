import { Component } from "@angular/core";
import { RadioGroup } from "../../components/radio-group/radio-group.component";

@Component({
  selector: "markas-example",
  imports: [RadioGroup],
  template: `
    <div class="grid gap-6">
      <markas-radio-group
        name="theme"
        label="Theme"
        value="system"
        orientation="horizontal"
        [options]="themes"
      />
      <markas-radio-group
        name="size"
        label="Size"
        value="m"
        orientation="horizontal"
        [options]="sizes"
      />
    </div>
  `,
})
export default class RadioGroupHorizontalExample {
  protected readonly themes = [
    {
      value: "light",
      label: "Light",
    },
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "system",
      label: "System",
    },
  ];
  protected readonly sizes = [
    {
      value: "s",
      label: "Small",
    },
    {
      value: "m",
      label: "Medium",
    },
    {
      value: "l",
      label: "Large",
    },
    {
      value: "xl",
      label: "Extra large",
    },
  ];
}
