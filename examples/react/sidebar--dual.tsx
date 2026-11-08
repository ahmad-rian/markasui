import { Sidebar } from "../../components/sidebar/Sidebar";

const mark = [
  { points: "354,578 1256,138 1171,430 268,868", className: "fill-ink/15" },
  { points: "553,443 1455,3 1370,295 467,733", className: "fill-ink/55" },
  {
    points: "421,762 1325,318 1240,611 336,1050",
    className: "fill-success/35",
  },
  { points: "265,1073 1169,629 1084,922 180,1362", className: "fill-ink/25" },
  { points: "93,965 997,521 912,814 8,1253", className: "fill-ink/75" },
  {
    points: "347,1135 1251,691 1166,984 262,1424",
    className: "fill-success",
  },
];

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 2,
      },
      {
        label: "Components",
        href: "/components",
        icon: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z",
        active: true,
      },
      {
        label: "Templates",
        href: "/templates",
        icon: "M3 4h18v16H3zm0 5h18M9 9v11",
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
    ],
  },
  {
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: "M4 6h9m4 0h3M4 12h3m4 0h9M4 18h11m4 0h1M15 4v4M9 10v4M17 16v4",
      },
    ],
  },
];

const groups = [
  {
    title: "Forms",
    links: [
      { label: "Button", count: 6, active: true },
      { label: "Input", count: 4 },
      { label: "Select", count: 3 },
      { label: "Checkbox", count: 4 },
    ],
  },
  {
    title: "Overlays",
    links: [
      { label: "Modal", count: 3 },
      { label: "Drawer", count: 2 },
      { label: "Popover", count: 4 },
    ],
  },
];

const link =
  "flex h-8 items-center justify-between rounded-md px-2 text-muted transition-colors duration-150 ease-out hover:bg-subtle hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:bg-subtle aria-[current=page]:font-medium aria-[current=page]:text-ink motion-reduce:transition-none";

export default function SidebarDualExample() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      defaultCollapsed
      className="h-[480px] rounded-xl border border-line"
      header={
        <svg
          className="size-7 shrink-0"
          viewBox="0 0 1464 1430"
          aria-hidden="true"
        >
          {mark.map((shape) => (
            <polygon
              key={shape.points}
              points={shape.points}
              className={shape.className}
            />
          ))}
        </svg>
      }
      footer={
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-ink">
          SW
        </span>
      }
    >
      <div className="flex min-h-0 flex-1">
        <div className="flex w-48 shrink-0 flex-col border-r border-line bg-surface">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
            <p className="text-sm font-semibold text-ink">Components</p>
            <span className="rounded-full bg-subtle px-2 py-0.5 text-xs text-muted">
              61
            </span>
          </div>
          <nav
            aria-label="Components"
            className="grid min-h-0 content-start gap-4 overflow-y-auto p-3 text-sm"
          >
            {groups.map((group) => (
              <div key={group.title} className="grid gap-0.5">
                <p className="px-2 pb-1 text-xs font-medium text-faint">
                  {group.title}
                </p>
                {group.links.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    aria-current={item.active ? "page" : undefined}
                    className={link}
                  >
                    {item.label}
                    <span className="text-xs text-faint">{item.count}</span>
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
          <div className="grid gap-1">
            <p className="text-xs text-muted">Forms</p>
            <p className="text-base font-semibold text-ink">Button</p>
            <p className="text-xs leading-relaxed text-muted">
              Six variants, three sizes, and a loading state.
            </p>
          </div>
          <div className="grid flex-1 place-content-center justify-items-center gap-2 rounded-xl border border-line bg-surface p-4">
            <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-on-primary">
              Get started
            </span>
            <span className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink">
              View docs
            </span>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
