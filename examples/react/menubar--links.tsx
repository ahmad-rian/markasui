import { Menubar } from "../../components/menubar/Menubar";

const menus = [
  {
    label: "Products",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
      },
      {
        label: "Automation",
        href: "/automation",
      },
      {
        label: "Reports",
        href: "/reports",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Contact",
        href: "mailto:hello@example.com",
      },
    ],
  },
];

export default function MenubarLinksExample() {
  return <Menubar label="Site" menus={menus} />;
}
