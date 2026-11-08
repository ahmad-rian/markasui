import { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Features", href: "/features", active: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
];

export default function NavbarAnnouncementExample() {
  const [open, setOpen] = useState(true);
  return (
    <div className="grid">
      {open && (
        <div className="flex items-center gap-3 bg-primary py-2 pr-2 pl-4 text-sm text-on-primary">
          <p className="flex-1">
            Acme 2.0 is out.{" "}
            <a
              href="/changelog"
              className="rounded-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
            >
              See what is new
            </a>
          </p>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setOpen(false)}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
      <Navbar links={links} brand="Acme" />
    </div>
  );
}
