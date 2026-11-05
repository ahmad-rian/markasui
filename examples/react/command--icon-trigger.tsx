import { Button } from "../../components/button/Button";
import { Command } from "../../components/command/Command";

const items = [
  {
    group: "Workspace",
    label: "Create project",
    value: "create-project",
    shortcut: "Ctrl+N",
  },
  {
    group: "Workspace",
    label: "Invite member",
    value: "invite",
    shortcut: "Ctrl+I",
  },
  { group: "Account", label: "Switch theme", value: "theme" },
  { group: "Account", label: "Sign out", value: "sign-out" },
];

export default function CommandIconTriggerExample() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-2">
      <span className="text-sm font-medium text-ink">Acme workspace</span>
      <Command
        placeholderLabel="Run a command..."
        items={items}
        trigger={
          <Button variant="ghost" size="sm" aria-label="Open commands">
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
              <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
            </svg>
          </Button>
        }
      />
    </div>
  );
}
