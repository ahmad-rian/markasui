import { Button } from "../../components/button/Button";
import { NavigationMenu } from "../../components/navigation-menu/NavigationMenu";

const items = [
  {
    label: "Products",
    featured: {
      title: "Workflows 2.0",
      href: "/workflows",
      description: "Branching, retries, and a visual editor for every team",
    },
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Automation",
        href: "/automation",
        description: "Run workflows on a schedule",
        icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Connect the tools you already use",
        icon: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm13 0v6m-3-3h6",
      },
      {
        label: "Security",
        href: "/security",
        description: "Roles, audit logs, and SSO",
        icon: "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z",
      },
    ],
  },
  {
    label: "Developers",
    links: [
      {
        label: "Documentation",
        href: "/docs",
        description: "Guides and API reference",
        icon: "M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5a2.5 2.5 0 0 0 0 5H20",
      },
      {
        label: "API",
        href: "/api",
        description: "REST endpoints and webhooks",
        icon: "m8 9-4 3 4 3m8-6 4 3-4 3m-6 4 4-14",
      },
      {
        label: "Changelog",
        href: "/changelog",
        description: "What shipped this month",
        icon: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
      },
      {
        label: "Status",
        href: "/status",
        description: "Uptime and incidents",
        icon: "M3 12h4l3-8 4 16 3-8h4",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const header =
  "@container flex items-center gap-3 rounded-xl border border-line bg-surface py-2 pr-3 pl-4";
const brand = "flex shrink-0 items-center gap-2 text-sm font-semibold text-ink";
const logo = "size-6";
const nav = "min-w-0 flex-1";
const actions = "flex shrink-0 items-center gap-2";
const signIn = "hidden @lg:block";

export default function NavigationMenuHeaderExample() {
  return (
    <header className={header}>
      <a href="/" className={brand}>
        <svg
          className={logo}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3 3 8v8l9 5 9-5V8l-9-5zm0 0v18M3 8l9 5 9-5" />
        </svg>
        <span>Northwind</span>
      </a>
      <NavigationMenu items={items} className={nav} />
      <div className={actions}>
        <div className={signIn}>
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
        </div>
        <Button size="sm">Get started</Button>
      </div>
    </header>
  );
}
