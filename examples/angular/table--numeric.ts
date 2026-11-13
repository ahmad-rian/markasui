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
      caption="Sales by product"
      [columns]="columns"
      [rows]="rows"
    ></div>
  `,
})
export default class TableNumericExample {
  protected readonly columns: TableColumn[] = [
    { key: "product", label: "Product" },
    { key: "units", label: "Units", align: "right" },
    { key: "price", label: "Price", align: "right" },
    { key: "revenue", label: "Revenue", align: "right" },
  ];
  protected readonly rows = [
    {
      product: "Wireless mouse",
      units: 1240,
      price: "$24.00",
      revenue: "$29,760.00",
    },
    {
      product: "USB-C hub",
      units: 860,
      price: "$39.00",
      revenue: "$33,540.00",
    },
    {
      product: "Laptop stand",
      units: 312,
      price: "$59.00",
      revenue: "$18,408.00",
    },
    { product: "Desk mat", units: 95, price: "$18.50", revenue: "$1,757.50" },
  ];
}
