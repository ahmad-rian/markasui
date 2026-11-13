import { Component } from "@angular/core";
import { Button } from "../../components/button/button.component";
import { Input } from "../../components/input/input.component";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

@Component({
  selector: "markas-example",
  imports: [Button, Input, Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" defaultValue="profile">
      <ng-template markasTabPanel="profile">
        <div class="grid gap-4">
          <markas-input name="name" label="Name" value="Siti Aminah" />
          <markas-input
            name="email"
            type="email"
            label="Email"
            value="siti&#64;example.com"
          />
          <div>
            <button markas-button>Save changes</button>
          </div>
        </div>
      </ng-template>
      <ng-template markasTabPanel="password">
        <div class="grid gap-4">
          <markas-input
            name="current-password"
            type="password"
            label="Current password"
          />
          <markas-input
            name="new-password"
            type="password"
            label="New password"
            hint="At least 8 characters"
          />
          <div>
            <button markas-button>Update password</button>
          </div>
        </div>
      </ng-template>
    </markas-tabs>
  `,
})
export default class TabsFormExample {
  protected readonly items = [
    { value: "profile", label: "Profile" },
    { value: "password", label: "Password" },
  ];
}
