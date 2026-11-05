import { Command } from "../../components/command/Command";

const items = [
  { group: "Pages", label: "Dashboard", value: "dashboard" },
  { group: "Pages", label: "Invoices", value: "invoices" },
  { group: "Pages", label: "Customers", value: "customers" },
  { group: "Actions", label: "Create invoice", value: "create-invoice" },
  { group: "Actions", label: "Add customer", value: "add-customer" },
];

export default function CommandSearchFieldExample() {
  return (
    <Command
      hotkey
      items={items}
      trigger={
        <button
          type="button"
          className="flex h-10 w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-left text-sm text-muted transition-colors duration-150 ease-out hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
        >
          <svg
            className="size-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Search
          <kbd className="ms-auto rounded-md border border-line bg-subtle px-1.5 py-0.5 font-sans text-xs text-muted">
            Ctrl K
          </kbd>
        </button>
      }
    />
  );
}
