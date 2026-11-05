import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  {
    label: "Product",
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
    label: "Customers",
    href: "/customers",
  },
  {
    label: "Pricing",
    href: "/pricing",
    active: true,
  },
];

export default function NavbarFloatingExample() {
  return (
    <Navbar
      links={links}
      variant="floating"
      brand={
        <>
          <svg
            className="size-6 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m12 3-9 5 9 5 9-5-9-5z" />
            <path d="m3 13 9 5 9-5" />
          </svg>
          <span>Acme</span>
        </>
      }
      actions={<Button size="sm">Get started</Button>}
    />
  );
}
