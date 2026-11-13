import { Component } from "@angular/core";
import {
  Badge,
  type BadgeVariant,
} from "../../components/badge/badge.component";
import { Table } from "../../components/table/table.component";

@Component({
  selector: "markas-example",
  imports: [Badge, Table],
  template: `
    <div
      markas-table
      caption="Invoices"
      [columns]="columns"
      [rows]="rows"
      rowKey="invoice"
      [cells]="{ status: statusCell }"
    ></div>
    <ng-template #statusCell let-row>
      <span markas-badge [variant]="statusVariants[row.status] ?? 'neutral'">{{
        row.status
      }}</span>
    </ng-template>
  `,
})
export default class TableStatusExample {
  protected readonly columns = [
    { key: "invoice", label: "Invoice" },
    { key: "customer", label: "Customer" },
    { key: "status", label: "Status" },
    { key: "amount", label: "Amount", align: "right" as const },
  ];
  protected readonly rows = [
    {
      invoice: "INV-1024",
      customer: "Budi Santoso",
      status: "Paid",
      amount: "$250.00",
    },
    {
      invoice: "INV-1025",
      customer: "Siti Aminah",
      status: "Pending",
      amount: "$85.00",
    },
    {
      invoice: "INV-1026",
      customer: "John Carter",
      status: "Overdue",
      amount: "$1,200.00",
    },
    {
      invoice: "INV-1027",
      customer: "Dewi Lestari",
      status: "Draft",
      amount: "$40.00",
    },
  ];
  protected readonly statusVariants: Record<string, BadgeVariant> = {
    Paid: "success",
    Pending: "warning",
    Overdue: "danger",
    Draft: "neutral",
  };
}
