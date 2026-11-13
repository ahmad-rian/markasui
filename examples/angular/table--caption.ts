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
      showCaption
      [columns]="columns"
      [rows]="rows"
    ></div>
  `,
})
export default class TableCaptionExample {
  protected readonly columns: TableColumn[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "joined", label: "Joined" },
  ];
  protected readonly rows = [
    { name: "Sarah Miller", role: "Owner", joined: "Jan 12, 2025" },
    { name: "Budi Santoso", role: "Editor", joined: "Mar 3, 2025" },
    { name: "Siti Aminah", role: "Viewer", joined: "Aug 21, 2025" },
  ];
}
