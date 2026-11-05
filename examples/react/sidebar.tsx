import { Sidebar } from "../../components/sidebar/Sidebar";

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
        badge: 12,
      },
    ],
  },
  {
    title: "Workspace",
    items: [
      {
        label: "Projects",
        icon: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        children: [
          {
            label: "Website redesign",
            href: "/projects/website",
            active: true,
          },
          {
            label: "Mobile app",
            href: "/projects/mobile",
          },
          {
            label: "Brand refresh",
            href: "/projects/brand",
          },
        ],
      },
      {
        label: "Analytics",
        href: "/analytics",
        icon: "M3 3v18h18M7 15l4-4 3 3 5-6",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: "M4 6h9m4 0h3M4 12h3m4 0h9M4 18h11m4 0h1M15 4v4M9 10v4M17 16v4",
      },
    ],
  },
];

export default function SidebarFixture() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      className="h-[540px] rounded-xl border border-line"
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
