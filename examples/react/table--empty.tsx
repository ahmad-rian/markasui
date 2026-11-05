import { Button } from "../../components/button/Button";
import { Table, type TableColumn } from "../../components/table/Table";

const columns: TableColumn[] = [
  { key: "invoice", label: "Invoice" },
  { key: "customer", label: "Customer" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount", align: "right" },
];

export default function TableEmptyExample() {
  return (
    <div className="grid gap-3">
      <Table caption="Invoices" columns={columns} rows={[]} />
      <div className="grid justify-items-center gap-2 rounded-xl border border-dashed border-line px-6 py-8 text-center">
        <svg
          className="size-6 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 7v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7M4 7l2-3h12l2 3M9 12h6" />
        </svg>
        <p className="text-sm font-medium text-ink">No invoices yet</p>
        <p className="text-sm text-muted">
          Invoices you create will show up here.
        </p>
        <Button size="sm" className="mt-2">
          Create invoice
        </Button>
      </div>
    </div>
  );
}
