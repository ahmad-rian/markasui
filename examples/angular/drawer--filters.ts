import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Checkbox } from "../../components/checkbox/checkbox.component";
import { Drawer } from "../../components/drawer/drawer.component";

@Component({
  selector: "markas-example",
  imports: [Button, Checkbox, Drawer],
  template: `
    <div class="flex justify-center">
      <markas-drawer title="Filter products">
        <button markas-button trigger variant="secondary">
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 5h18M6 12h12M10 19h4" />
          </svg>
          Filters
        </button>

        <fieldset class="grid gap-3">
          <legend class="mb-3 font-medium text-ink">Category</legend>
          <markas-checkbox name="category-shoes" label="Shoes" />
          <markas-checkbox name="category-bags" label="Bags" />
          <markas-checkbox name="category-accessories" label="Accessories" />
        </fieldset>

        <ng-container footer>
          <button markas-button variant="secondary" type="submit" value="reset">
            Reset
          </button>
          <button markas-button type="submit" value="apply">
            Show results
          </button>
        </ng-container>
      </markas-drawer>
    </div>
  `,
})
export default class DrawerFiltersExample {}
