import { Component } from "@angular/core";
import { Table } from "../../components/table/table.component";

@Component({
  selector: "markas-example",
  imports: [Table],
  template: `
    <div
      markas-table
      caption="Recent orders"
      [columns]="columns"
      [rows]="rows"
    ></div>
  `,
})
export default class TableExample {
  protected readonly columns = [
    { key: "code", label: "Order" },
    { key: "customer", label: "Customer" },
    { key: "status", label: "Status" },
    { key: "total", label: "Total", align: "right" as const },
  ];
  protected readonly rows = [
    {
      code: "INV-1024",
      customer: "Budi Santoso",
      status: "Paid",
      total: "$250.00",
    },
    {
      code: "INV-1025",
      customer: "Siti Aminah",
      status: "Pending",
      total: "$85.00",
    },
    {
      code: "INV-1026",
      customer: "Dewi Lestari",
      status: "Shipped",
      total: "$1,200.00",
    },
  ];
}
