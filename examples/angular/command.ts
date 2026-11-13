import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Command } from "../../components/command/command.component";

@Component({
  selector: "markas-example",
  imports: [Button, Command],
  template: `
    <markas-command hotkey [items]="items">
      <button markas-button trigger variant="secondary">
        Open command palette
      </button>
    </markas-command>
  `,
})
export default class CommandExample {
  protected readonly items = [
    { group: "Suggestions", label: "Calendar", value: "calendar" },
    { group: "Suggestions", label: "Search emoji", value: "emoji" },
    { group: "Suggestions", label: "Calculator", value: "calculator" },
    {
      group: "Settings",
      label: "Profile",
      value: "profile",
      shortcut: "Ctrl+P",
    },
    {
      group: "Settings",
      label: "Billing",
      value: "billing",
      shortcut: "Ctrl+B",
    },
    {
      group: "Settings",
      label: "Settings",
      value: "settings",
      shortcut: "Ctrl+S",
    },
  ];
}
