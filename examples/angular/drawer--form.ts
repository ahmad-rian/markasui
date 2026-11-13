import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Drawer } from "../../components/drawer/drawer.component";
import { Input } from "../../components/input/input.component";

@Component({
  selector: "markas-example",
  imports: [Button, Drawer, Input],
  template: `
    <div class="flex justify-center">
      <markas-drawer title="Edit profile">
        <button markas-button trigger>Edit profile</button>

        <div class="grid gap-4">
          <markas-input
            name="profile-name"
            label="Display name"
            placeholder="Budi Santoso"
          />
          <markas-input
            name="profile-role"
            label="Job title"
            placeholder="Product designer"
          />
          <markas-input
            name="profile-website"
            type="url"
            label="Website"
            placeholder="https://example.com"
          />
        </div>

        <ng-container footer>
          <button
            markas-button
            variant="secondary"
            type="submit"
            value="cancel"
          >
            Cancel
          </button>
          <button markas-button type="submit" value="save">Save changes</button>
        </ng-container>
      </markas-drawer>
    </div>
  `,
})
export default class DrawerFormExample {}
