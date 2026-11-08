import { Button } from "../../components/button/Button";
import { Drawer } from "../../components/drawer/Drawer";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Inbox", href: "/inbox", active: true },
  { label: "Calendar", href: "/calendar" },
  { label: "Files", href: "/files" },
];

const sections = [
  { label: "Inbox", href: "/inbox" },
  { label: "Calendar", href: "/calendar" },
  { label: "Files", href: "/files" },
  { label: "Settings", href: "/settings" },
];

export default function NavbarSidebarTriggerExample() {
  return (
    <Navbar
      links={links}
      brand={
        <>
          <Drawer
            side="left"
            title="Workspace"
            trigger={
              <Button
                variant="ghost"
                aria-label="Open sidebar"
                className="-ml-2 size-9 px-0"
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
                  <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                  <path d="M9 4v16" />
                </svg>
              </Button>
            }
          >
            <nav aria-label="Workspace" className="grid gap-1">
              {sections.map((section) => (
                <a
                  key={section.href}
                  href={section.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-subtle"
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </Drawer>
          <span>Acme Mail</span>
        </>
      }
    />
  );
}
