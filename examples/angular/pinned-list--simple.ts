import { Component } from "@angular/core";
import { PinnedList } from "../../components/pinned-list/pinned-list.component";

@Component({
  selector: "markas-example",
  imports: [PinnedList],
  template: ` <markas-pinned-list [items]="items" /> `,
})
export default class PinnedListSimpleExample {
  protected readonly items = [
    { value: "jakarta", label: "Jakarta", meta: "31°C" },
    { value: "bandung", label: "Bandung", meta: "24°C" },
    { value: "surabaya", label: "Surabaya", meta: "33°C" },
    { value: "denpasar", label: "Denpasar", meta: "29°C" },
  ];
}
