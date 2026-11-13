import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Drawer } from "../../components/drawer/drawer.component";

@Component({
  selector: "markas-example",
  imports: [Button, Drawer],
  template: `
    <markas-drawer title="Filter products">
      <button markas-button trigger variant="secondary">Open filters</button>

      Choose a category and price range to filter the product list.

      <ng-container footer>
        <button markas-button variant="secondary" type="submit" value="cancel">
          Cancel
        </button>
        <button markas-button type="submit" value="apply">Apply</button>
      </ng-container>
    </markas-drawer>
  `,
})
export default class DrawerExample {}
