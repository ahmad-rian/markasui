import { useState } from "react";
import { Badge } from "../../components/badge/Badge";
import { Button } from "../../components/button/Button";
import { Navbar } from "../../components/navbar/Navbar";
import { ThemeToggle } from "../../components/theme-toggle/ThemeToggle";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components", active: true },
  { label: "Templates", href: "/templates" },
  { label: "Changelog", href: "/changelog" },
];

const shell = "@container grid";
const bar =
  "relative flex items-center justify-center bg-primary bg-[radial-gradient(45%_160%_at_50%_0%,color-mix(in_oklab,var(--color-success)_55%,transparent),transparent)] py-2 pr-11 pl-4 text-sm text-on-primary";
const message =
  "group inline-flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const badge = "bg-surface!";
const headline = "truncate font-medium";
const detail = "hidden text-on-primary/75 @lg:inline";
const arrow =
  "size-4 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none";
const dismiss =
  "absolute right-2 inline-flex size-7 items-center justify-center rounded-md transition-colors duration-150 ease-out hover:bg-on-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-primary";
const icon = "size-4";
const brand = "flex items-center gap-2 rounded-md";
const logoClass = "size-6";

export default function NavbarAnnouncementExample() {
  const [open, setOpen] = useState(true);
  return (
    <div className={shell}>
      {open && (
        <div className={bar}>
          <a href="/changelog" className={message}>
            <Badge variant="success" className={badge}>
              New
            </Badge>
            <span className={headline}>MarkasUI 1.0 is here</span>
            <span className={detail}>Read the release notes</span>
            <svg
              className={arrow}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setOpen(false)}
            className={dismiss}
          >
            <svg
              className={icon}
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
      <Navbar
        links={links}
        brand={
          <a href="/" className={brand}>
            <svg
              className={logoClass}
              viewBox="0 0 1464 1430"
              aria-hidden="true"
            >
              {logo.map((shape) => (
                <polygon
                  key={shape.points}
                  className={shape.fill}
                  points={shape.points}
                />
              ))}
            </svg>
            <span>MarkasUI</span>
          </a>
        }
        actions={
          <>
            <ThemeToggle size="sm" animation="eclipse" />
            <Button size="sm">Get started</Button>
          </>
        }
      />
    </div>
  );
}
