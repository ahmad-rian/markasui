import { Button } from "../../components/button/Button";
import { Command } from "../../components/command/Command";

const items = [
  { group: "Suggestions", label: "Calendar", value: "calendar" },
  { group: "Suggestions", label: "Search emoji", value: "emoji" },
  { group: "Suggestions", label: "Calculator", value: "calculator" },
  { group: "Settings", label: "Profile", value: "profile", shortcut: "Ctrl+P" },
  { group: "Settings", label: "Billing", value: "billing", shortcut: "Ctrl+B" },
  {
    group: "Settings",
    label: "Settings",
    value: "settings",
    shortcut: "Ctrl+S",
  },
];

export default function CommandFixture() {
  return (
    <Command
      hotkey
      items={items}
      trigger={<Button variant="secondary">Open command palette</Button>}
    />
  );
}
