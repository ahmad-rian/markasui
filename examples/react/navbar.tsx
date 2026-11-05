import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  {
    label: "Home",
    href: "/",
    active: true,
  },
  {
    label: "Products",
    children: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "Track usage in real time",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, SSO, and audit logs",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        label: "Docs",
        href: "/docs",
        description: "Guides and API reference",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this week",
      },
      {
        label: "Community",
        href: "/community",
        description: "Ask and share with others",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export default function NavbarFixture() {
  return (
    <Navbar
      links={links}
      brand="MarkasUI"
      actions={<Button size="sm">Sign in</Button>}
    />
  );
}
