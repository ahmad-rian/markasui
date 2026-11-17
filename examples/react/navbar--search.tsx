import { Command } from "../../components/command/Command";
import { Kbd } from "../../components/kbd/Kbd";
import { Navbar } from "../../components/navbar/Navbar";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const links = [
  { label: "Docs", href: "/docs", active: true },
  { label: "Components", href: "/components" },
  { label: "Blog", href: "/blog" },
];

const commands = [
  { group: "Components", label: "Button", href: "/components/button" },
  { group: "Components", label: "Navbar", href: "/components/navbar" },
  { group: "Components", label: "Command", href: "/components/command" },
  { group: "Pages", label: "Installation", href: "/docs/installation" },
  { group: "Pages", label: "Templates", href: "/templates" },
  { group: "Pages", label: "Changelog", href: "/changelog" },
];

/** From 42rem the links move to the end so the search sits in the middle. */
const layout =
  "[&>div>div:last-child]:min-w-0 [&>div>div:last-child]:flex-1 @2xl:[&>div>nav]:order-last";
const brand = "flex items-center gap-2 rounded-md";
const logoClass = "size-6";
const search =
  "mx-auto flex h-10 max-w-md min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-canvas pr-2 pl-4 text-sm text-muted transition-colors duration-150 ease-out hover:border-primary-line hover:bg-subtle motion-reduce:transition-none";
const searchIcon = "size-4 shrink-0";
const placeholder = "min-w-0 flex-1 truncate text-left";
// Phones have no hotkey, and the label needs the room in a narrow bar.
const shortcut = "@max-xs:hidden";

export default function NavbarSearchExample() {
  return (
    <Navbar
      links={links}
      className={layout}
      brand={
        <a href="/" className={brand}>
          <svg className={logoClass} viewBox="0 0 1464 1430" aria-hidden="true">
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
        <Command
          hotkey
          items={commands}
          trigger={
            <button type="button" aria-keyshortcuts="Meta+K" className={search}>
              <svg
                className={searchIcon}
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
              <span className={placeholder}>Search components</span>
              <Kbd size="sm" className={shortcut}>
                ⌘K
              </Kbd>
            </button>
          }
        />
      }
    />
  );
}
