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
    title: "Getting started",
    items: [
      {
        label: "Introduction",
        href: "/docs",
        icon: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 16V5m4 2h7",
      },
      {
        label: "Installation",
        href: "/docs/installation",
        icon: "M12 4v11m-4-4 4 4 4-4M5 20h14",
      },
      {
        label: "Theming",
        href: "/docs/theming",
        icon: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.2-1-1.5-1-2.5 0-.8.7-1.5 1.5-1.5H17a4 4 0 0 0 4-4c0-4.4-4-8.5-9-8.5M7.5 12h.01M10 7.5h.01M15 7.5h.01",
        badge: "New",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        label: "Forms",
        icon: "M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z",
        children: [
          { label: "Button", href: "/docs/button" },
          { label: "Input", href: "/docs/input" },
          { label: "Select", href: "/docs/select", active: true },
          { label: "Combobox", href: "/docs/combobox" },
        ],
      },
      {
        label: "Overlays",
        icon: "M8 8V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3M4 9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
        children: [
          { label: "Modal", href: "/docs/modal" },
          { label: "Drawer", href: "/docs/drawer" },
          { label: "Popover", href: "/docs/popover" },
        ],
      },
      {
        label: "Motion",
        icon: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6",
        badge: "New",
        children: [
          { label: "Marquee", href: "/docs/marquee" },
          { label: "Text scramble", href: "/docs/text-scramble" },
        ],
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Templates",
        href: "/templates",
        icon: "M3 4h18v16H3zm0 5h18M9 9v11",
      },
      {
        label: "Changelog",
        href: "/changelog",
        icon: "M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5",
      },
    ],
  },
];

export default function SidebarDocsExample() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      className="h-[560px] rounded-xl border border-line"
      header={
        <>
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
          <span className="font-semibold text-ink">MarkasUI</span>
          <span className="ms-auto me-2 rounded-full border border-line px-2 py-0.5 text-xs text-muted">
            v1.4
          </span>
        </>
      }
      footer={
        <a
          href="/changelog"
          className="flex w-full items-center gap-2 rounded-md text-xs text-muted transition-colors duration-150 ease-out hover:text-ink motion-reduce:transition-none"
        >
          <span className="rounded-full bg-success/15 px-1.5 py-0.5 font-medium text-ink">
            1.4
          </span>
          Release notes
          <svg
            className="ms-auto size-4 shrink-0"
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
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div className="grid gap-1.5">
          <p className="text-xs text-muted">Components / Forms</p>
          <p className="text-xl font-semibold tracking-tight text-ink">
            Select
          </p>
          <p className="text-xs leading-relaxed text-muted">
            A native select with a custom chevron, three sizes, and an error
            state.
          </p>
        </div>
        <div className="grid flex-1 place-items-center rounded-xl border border-line bg-surface p-4">
          <span className="flex h-9 w-full items-center justify-between rounded-lg border border-line bg-canvas px-3 text-sm text-ink">
            Bandung
            <svg
              className="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
        <div className="grid gap-1.5 border-l border-line pl-3 text-xs">
          <p className="font-medium text-ink">On this page</p>
          <p className="text-muted">Usage</p>
          <p className="text-muted">Sizes</p>
          <p className="text-muted">Error state</p>
        </div>
      </div>
    </Sidebar>
  );
}
