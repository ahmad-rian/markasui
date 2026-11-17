import { Avatar } from "../../components/avatar/Avatar";
import { Badge } from "../../components/badge/Badge";
import { BottomNavigation } from "../../components/bottom-navigation/BottomNavigation";
import { Navbar } from "../../components/navbar/Navbar";

const logo = [
  { fill: "fill-ink/15", points: "354,578 1256,138 1171,430 268,868" },
  { fill: "fill-ink/55", points: "553,443 1455,3 1370,295 467,733" },
  { fill: "fill-success/35", points: "421,762 1325,318 1240,611 336,1050" },
  { fill: "fill-ink/30", points: "265,1073 1169,629 1084,922 180,1362" },
  { fill: "fill-ink/80", points: "93,965 997,521 912,814 8,1253" },
  { fill: "fill-success", points: "347,1135 1251,691 1166,984 262,1424" },
];

const tabs = [
  {
    value: "home",
    label: "Home",
    icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  },
  {
    value: "components",
    label: "Components",
    icon: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 3.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z",
  },
  {
    value: "saved",
    label: "Saved",
    icon: "M6 3h12v18l-6-4-6 4z",
    badge: 2,
  },
  {
    value: "profile",
    label: "Profile",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  },
];

const updates = [
  { name: "Navbar", note: "Eight new layouts", tag: "New" },
  { name: "Command", note: "Grouped results and hotkey", tag: "Updated" },
  { name: "Sidebar", note: "Collapsible icon rail", tag: "Updated" },
  { name: "Footer", note: "Newsletter and sitemap", tag: "New" },
  { name: "Theme toggle", note: "Six transition styles", tag: "Updated" },
];

const phone =
  "relative mx-auto flex h-[560px] w-full max-w-[360px] flex-col overflow-hidden rounded-[2.5rem] border border-line bg-canvas";
/** Bottom tabs replace the menu button on small screens. */
const top = "shrink-0 pt-3 [&_[aria-controls$=-menu]]:hidden";
const brand = "flex items-center gap-2 rounded-md";
const logoClass = "size-6";
const feed =
  "flex-1 overflow-y-auto px-4 pt-5 pb-28 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";
const greeting = "text-sm text-muted";
const heading = "mt-1 text-2xl font-semibold tracking-tight text-ink";
const list =
  "mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface";
const row = "flex items-center gap-3 px-4 py-3";
const rowBody = "grid min-w-0 flex-1";
const rowTitle = "text-sm font-medium text-ink";
const rowNote = "truncate text-xs text-muted";
const tabBar = "absolute inset-x-4 bottom-4";

export default function NavbarBottomTabsExample() {
  return (
    <div className={phone}>
      <Navbar
        variant="blur"
        className={top}
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
        actions={<Avatar name="Ahmad Rian" size="sm" />}
      />
      <div role="region" aria-label="Updates" tabIndex={0} className={feed}>
        <p className={greeting}>Good morning, Rian</p>
        <h2 className={heading}>What shipped this week</h2>
        <ul className={list}>
          {updates.map((update) => (
            <li key={update.name} className={row}>
              <span className={rowBody}>
                <span className={rowTitle}>{update.name}</span>
                <span className={rowNote}>{update.note}</span>
              </span>
              <Badge variant={update.tag === "New" ? "success" : "neutral"}>
                {update.tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
      <BottomNavigation items={tabs} className={tabBar} />
    </div>
  );
}
