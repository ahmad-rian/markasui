import { Avatar } from "../../components/avatar/Avatar";
import { Button } from "../../components/button/Button";
import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Overview", href: "/overview", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Reports", href: "/reports" },
];

const account = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
  { separator: true as const },
  { label: "Sign out", value: "sign-out", danger: true },
];

export default function NavbarAppExample() {
  return (
    <Navbar
      links={links}
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
      actions={
        <>
          <Button
            variant="ghost"
            aria-label="Notifications, 3 unread"
            className="relative size-9 px-0"
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute top-2 right-2 size-2 rounded-full bg-danger ring-2 ring-surface" />
          </Button>
          <DropdownMenu
            label="Account"
            items={account}
            trigger={<Avatar name="Siti Aminah" size="sm" />}
            className="[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1"
          />
        </>
      }
    />
  );
}
