import { Component } from "@angular/core";
import { BottomNavigation } from "../../components/bottom-navigation/bottom-navigation.component";

@Component({
  selector: "markas-example",
  imports: [BottomNavigation],
  template: `
    <div class="rounded-2xl bg-subtle p-6">
      <markas-bottom-navigation [items]="items" defaultValue="updates" />
    </div>
  `,
})
export default class BottomNavigationBadgesExample {
  protected readonly items = [
    {
      value: "chats",
      label: "Chats",
      icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
      badge: 3,
    },
    {
      value: "calls",
      label: "Calls",
      icon: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
    },
    {
      value: "updates",
      label: "Updates",
      icon: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
      badge: 12,
    },
    {
      value: "settings",
      label: "Settings",
      icon: "M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M16 4v4M10 10v4M18 16v4",
    },
  ];
}
