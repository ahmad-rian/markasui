import { Avatar } from "../../components/avatar/Avatar";
import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export default function NavbarActionsExample() {
  return (
    <Navbar
      links={links}
      brand="Acme"
      actions={
        <>
          <Button variant="ghost" aria-label="Search" className="size-9 px-0">
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
              <path d="m21 21-4.3-4.3" />
              <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            aria-label="Notifications"
            className="size-9 px-0"
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
          </Button>
          <Avatar name="Siti Aminah" size="sm" />
        </>
      }
    />
  );
}
