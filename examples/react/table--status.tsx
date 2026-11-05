import { Badge, type BadgeProps } from "../../components/badge/Badge";
import { Table, type TableRow } from "../../components/table/Table";

const columns = [
  { key: "invoice", label: "Invoice" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount", align: "right" as const },
];
const rows = [
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
const statusVariants: Record<string, BadgeProps["variant"]> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "danger",
  Draft: "neutral",
};

const renderCell = (row: TableRow, key: string) =>
  key === "status" ? (
    <Badge variant={statusVariants[String(row.status)]}>{row.status}</Badge>
  ) : undefined;

export default function TableStatusExample() {
  return (
    <Table
      caption="Invoices"
      columns={columns}
      rows={rows}
      rowKey="invoice"
      renderCell={renderCell}
    />
  );
}
