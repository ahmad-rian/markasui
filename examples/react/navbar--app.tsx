import { Avatar } from "../../components/avatar/Avatar";
import { Breadcrumb } from "../../components/breadcrumb/Breadcrumb";
import { Button } from "../../components/button/Button";
import { DropdownMenu } from "../../components/dropdown-menu/DropdownMenu";
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
  { label: "Overview", href: "/overview", active: true },
  { label: "Deployments", href: "/deployments" },
  { label: "Analytics", href: "/analytics" },
  { label: "Settings", href: "/settings" },
];

const path = [{ label: "Markas", href: "/team" }, { label: "docs" }];

const account = [
  { label: "Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Billing", href: "/billing" },
  { separator: true as const },
  { label: "Sign out", value: "sign-out", danger: true },
];

const home = "rounded-md";
const logoClass = "size-6";
const slash = "hidden size-5 text-line @md:block";
const crumbs = "font-normal @max-xs:hidden";
const bell = "relative size-9 px-0!";
const icon = "size-5";
const count =
  "absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-on-primary ring-2 ring-surface";
const profile =
  "[&>button]:h-9 [&>button]:gap-1 [&>button]:border-0 [&>button]:px-1";

export default function NavbarAppExample() {
  return (
    <Navbar
      links={links}
      brand={
        <>
          <a href="/" aria-label="MarkasUI home" className={home}>
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
          </a>
          <svg
            className={slash}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M16 3 8 21" />
          </svg>
          <Breadcrumb items={path} className={crumbs} />
        </>
      }
      actions={
        <>
          <Button
            variant="ghost"
            aria-label="Notifications, 3 unread"
            className={bell}
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
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span aria-hidden="true" className={count}>
              3
            </span>
          </Button>
          <DropdownMenu
            label="Account"
            items={account}
            trigger={<Avatar name="Siti Aminah" size="sm" />}
            className={profile}
          />
        </>
      }
    />
  );
}
