import { Kbd } from "../../components/kbd/Kbd";
import { Navbar } from "../../components/navbar/Navbar";

const links = [
  { label: "Guides", href: "/guides", active: true },
  { label: "API", href: "/api" },
  { label: "Blog", href: "/blog" },
];

export default function NavbarSearchExample() {
  return (
    <Navbar
      links={links}
      brand="Acme Docs"
      actions={
        <button
          type="button"
          aria-keyshortcuts="Meta+K"
          className="inline-flex h-9 w-44 items-center gap-2 rounded-lg border border-line bg-canvas pr-1.5 pl-3 text-sm text-muted transition-colors duration-150 ease-out hover:bg-subtle"
        >
          <svg
            className="size-4 shrink-0"
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
          <span className="flex-1 text-left">Search docs</span>
          <Kbd size="sm">⌘K</Kbd>
        </button>
      }
    />
  );
}
