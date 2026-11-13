import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Command } from "../../components/command/command.component";

@Component({
  selector: "markas-example",
  imports: [Button, Command],
  template: `
    <markas-command [items]="items">
      <button markas-button trigger variant="ghost">
        Search documentation
      </button>
    </markas-command>
  `,
})
export default class CommandLinksExample {
  protected readonly items = [
    {
      group: "Documentation",
      label: "Getting started",
      href: "#getting-started",
    },
    { group: "Documentation", label: "Installation", href: "#installation" },
    { group: "Documentation", label: "Theming", href: "#theming" },
    { group: "Components", label: "Button", href: "#button" },
    { group: "Components", label: "Modal", href: "#modal" },
  ];
}
