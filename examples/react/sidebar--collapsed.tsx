import { Sidebar } from "../../components/sidebar/Sidebar";

const sections = [
  {
    items: [
      {
        label: "Home",
        href: "/",
        icon: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
        active: true,
      },
      {
        label: "Inbox",
        href: "/inbox",
        icon: "M3 13h5l1.5 3h5l1.5-3h5M5 5h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z",
        badge: 3,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Analytics",
        href: "/analytics",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
      {
        label: "Team",
        href: "/team",
        icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13 9v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
      },
      {
        label: "Billing",
        href: "/billing",
        icon: "M3 6h18v12H3zM3 10h18M7 15h3",
        disabled: true,
      },
    ],
  },
];

export default function SidebarCollapsedExample() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      defaultCollapsed
      className="h-[420px] rounded-xl border border-line"
      header={
        <>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-on-primary">
            A
          </div>
          <div className="grid leading-tight">
            <span className="font-semibold text-ink">Acme Inc</span>
            <span className="text-xs text-muted">Pro plan</span>
          </div>
        </>
      }
      footer={
        <>
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-subtle text-xs font-semibold text-ink">
              RS
            </span>
            <span className="grid leading-tight">
              <span className="font-medium text-ink">Rina Saputra</span>
              <span className="text-xs text-muted">rina@acme.co</span>
            </span>
          </div>
        </>
      }
    >
      <div className="flex-1 p-4">
        <div className="h-full rounded-lg border border-dashed border-line"></div>
      </div>
    </Sidebar>
  );
}
