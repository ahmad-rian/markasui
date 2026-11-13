import { Component } from "@angular/core";
import { TabPanel, Tabs } from "../../components/tabs/tabs.component";

@Component({
  selector: "markas-example",
  imports: [Tabs, TabPanel],
  template: `
    <markas-tabs [items]="items" defaultValue="account">
      <ng-template markasTabPanel="account"
        >Change your account name and email.</ng-template
      >
      <ng-template markasTabPanel="password"
        >Change your password regularly.</ng-template
      >
      <ng-template markasTabPanel="notifications"
        >Choose which emails you want to receive.</ng-template
      >
    </markas-tabs>
  `,
})
export default class TabsExample {
  protected readonly items = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "notifications", label: "Notifications" },
  ];
}
