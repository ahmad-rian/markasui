import { Component } from "@angular/core";
import { Menubar } from "../../components/menubar/menubar.component";

const menus = [
  {
    label: "File",
    items: [
      {
        label: "New file",
        value: "new",
      },
      {
        label: "Open",
        value: "open",
      },
      {
        label: "Save",
        value: "save",
      },
      {
        separator: true as const,
      },
      {
        label: "Close window",
        value: "close",
      },
    ],
  },
  {
    label: "Edit",
    items: [
      {
        label: "Undo",
        value: "undo",
      },
      {
        label: "Redo",
        value: "redo",
      },
      {
        separator: true as const,
      },
      {
        label: "Cut",
        value: "cut",
      },
      {
        label: "Copy",
        value: "copy",
      },
      {
        label: "Paste",
        value: "paste",
      },
    ],
  },
  {
    label: "View",
    items: [
      {
        label: "Zoom in",
        value: "zoom-in",
      },
      {
        label: "Zoom out",
        value: "zoom-out",
      },
      {
        label: "Full screen",
        value: "full-screen",
        disabled: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "About",
        value: "about",
      },
    ],
  },
];

@Component({
  selector: "markas-example",
  imports: [Menubar],
  template: ` <markas-menubar [menus]="menus" /> `,
})
export default class MenubarFixture {
  protected readonly menus = menus;
}
