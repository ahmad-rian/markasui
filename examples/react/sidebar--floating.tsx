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

const bars = [
  "h-[40%] bg-primary/15",
  "h-[62%] bg-primary/15",
  "h-[48%] bg-primary/15",
  "h-[78%] bg-primary/15",
  "h-[58%] bg-primary/15",
  "h-[70%] bg-primary/15",
  "h-[92%] bg-success",
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
        badge: 4,
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
        active: true,
      },
    ],
  },
  {
    title: "Team",
    items: [
      {
        label: "Members",
        href: "/members",
        icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13 9v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
      },
      {
        label: "Billing",
        href: "/billing",
        icon: "M3 6h18v12H3zM3 10h18M7 15h3",
      },
    ],
  },
];

export default function SidebarFloatingExample() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      variant="floating"
      className="h-[440px] rounded-xl border border-line [&>aside]:shadow-overlay"
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
          <div className="grid min-w-0 leading-tight">
            <span className="font-semibold text-ink">MarkasUI</span>
            <span className="text-xs text-muted">Team plan</span>
          </div>
        </>
      }
      footer={
        <>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-ink">
            RS
          </span>
          <span className="grid min-w-0 leading-tight">
            <span className="truncate font-medium text-ink">Rina Saputra</span>
            <span className="truncate text-xs text-muted">
              rina@markasui.com
            </span>
          </span>
        </>
      }
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3 py-4 pr-4 pl-2">
        <div className="flex items-start justify-between">
          <div className="grid gap-1">
            <p className="text-xs text-muted">Weekly visitors</p>
            <p className="text-xl font-semibold tracking-tight text-ink">
              12,480
            </p>
          </div>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-ink">
            +18%
          </span>
        </div>
        <div className="flex flex-1 items-end gap-1.5 rounded-xl border border-line bg-surface p-3">
          {bars.map((bar) => (
            <span key={bar} className={`flex-1 rounded-sm ${bar}`}></span>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
