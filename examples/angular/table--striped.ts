import { Component } from "@angular/core";
import {
  Table,
  type TableColumn,
} from "../../components/table/table.component";

@Component({
  selector: "markas-example",
  imports: [Table],
  template: `
    <div
      markas-table
      caption="Team members"
      [columns]="columns"
      [rows]="rows"
      striped
    ></div>
  `,
})
export default class TableStripedExample {
  protected readonly columns: TableColumn[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "location", label: "Location" },
  ];
  protected readonly rows = [
    { name: "Rani Wulandari", role: "Designer", location: "Jakarta" },
    { name: "Budi Santoso", role: "Engineer", location: "Bandung" },
    { name: "Siti Aminah", role: "Product manager", location: "Surabaya" },
    { name: "Agus Pratama", role: "Engineer", location: "Yogyakarta" },
    { name: "Dewi Lestari", role: "Support", location: "Denpasar" },
  ];
}
