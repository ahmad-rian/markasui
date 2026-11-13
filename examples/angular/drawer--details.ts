import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Drawer } from "../../components/drawer/drawer.component";

@Component({
  selector: "markas-example",
  imports: [Button, Drawer],
  template: `
    <div class="flex justify-center">
      <markas-drawer title="Order #1042">
        <button markas-button trigger variant="secondary">View order</button>

        <dl class="grid grid-cols-2 gap-y-3">
          <dt>Customer</dt>
          <dd class="text-ink">Rina Hartono</dd>
          <dt>Placed on</dt>
          <dd class="text-ink">12 Oct 2026</dd>
          <dt>Items</dt>
          <dd class="text-ink">3</dd>
          <dt>Total</dt>
          <dd class="font-medium text-ink">$128.00</dd>
        </dl>

        <ng-container footer>
          <button markas-button variant="secondary" type="submit" value="close">
            Close
          </button>
          <button markas-button type="submit" value="ship">
            Mark as shipped
          </button>
        </ng-container>
      </markas-drawer>
    </div>
  `,
})
export default class DrawerDetailsExample {}
