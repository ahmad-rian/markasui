import { Component } from "@angular/core";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";

@Component({
  selector: "markas-example",
  imports: [DropdownMenu],
  template: `
    <div class="flex justify-center">
      <markas-dropdown-menu label="Account" [items]="items" />
    </div>
  `,
})
export default class DropdownMenuLinksExample {
  protected readonly items = [
    { label: "Profile", href: "#profile" },
    { label: "Billing", href: "#billing" },
    { label: "Settings", href: "#settings" },
    { separator: true as const },
    { label: "Sign out", value: "sign-out" },
  ];
}
