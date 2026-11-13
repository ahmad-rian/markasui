import { Component } from "@angular/core";
import { ToggleGroup } from "../../components/toggle-group/toggle-group.component";

@Component({
  selector: "markas-example",
  imports: [ToggleGroup],
  template: `
    <div class="flex justify-center">
      <markas-toggle-group label="Calendar view" value="week" [items]="items" />
    </div>
  `,
})
export default class ToggleGroupFixture {
  protected readonly items = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];
}
