import { Component } from "@angular/core";
import { PinnedList } from "../../components/pinned-list/pinned-list.component";

@Component({
  selector: "markas-example",
  imports: [PinnedList],
  template: `
    <markas-pinned-list
      [items]="items"
      [defaultPinned]="['design', 'launch']"
    />
  `,
})
export default class PinnedListChannelsExample {
  protected readonly items = [
    {
      value: "general",
      label: "general",
      description: "Company-wide announcements",
      meta: "128",
      icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    },
    {
      value: "design",
      label: "design-crit",
      description: "Weekly critiques, Thursdays",
      meta: "14",
      icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    },
    {
      value: "launch",
      label: "launch-q4",
      description: "Release checklist and status",
      meta: "36",
      icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    },
    {
      value: "random",
      label: "random",
      description: "Cats, lunch, and memes",
      meta: "9",
      icon: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    },
  ];
}
