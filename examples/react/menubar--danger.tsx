import { Menubar } from "../../components/menubar/Menubar";

const menus = [
  {
    label: "Project",
    items: [
      {
        label: "Rename",
        value: "rename",
      },
      {
        label: "Duplicate",
        value: "duplicate",
      },
      {
        label: "Archive",
        value: "archive",
        disabled: true,
      },
      {
        separator: true as const,
      },
      {
        label: "Delete project",
        value: "delete",
        danger: true,
      },
    ],
  },
  {
    label: "Members",
    items: [
      {
        label: "Invite people",
        value: "invite",
      },
      {
        label: "Manage roles",
        value: "roles",
      },
      {
        separator: true as const,
      },
      {
        label: "Remove all guests",
        value: "remove-guests",
        danger: true,
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        label: "View invoices",
        value: "invoices",
      },
      {
        label: "Change plan",
        value: "plan",
        disabled: true,
      },
    ],
  },
];

export default function MenubarDangerExample() {
  return <Menubar label="Project" menus={menus} />;
}
