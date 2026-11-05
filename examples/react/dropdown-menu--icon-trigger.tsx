import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";

const items = [
  { label: "Document", value: "document" },
  { label: "Spreadsheet", value: "spreadsheet" },
  { label: "Folder", value: "folder" },
];

export default function DropdownMenuIconTriggerExample() {
  return (
    <div className="flex justify-center">
      <DropdownMenu
        items={items}
        trigger={
          <>
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            New
          </>
        }
      />
    </div>
  );
}
