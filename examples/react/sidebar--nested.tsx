import { Sidebar } from "../../components/sidebar/Sidebar";

const sections = [
  {
    title: "Getting started",
    items: [
      {
        label: "Introduction",
        icon: "M5 19c1-3 3-5 5-6m-1 6 1.5-4.5L15 10m4-5c-5 0-9 3-11 8l3 3c5-2 8-6 8-11zM14 8h.01",
        children: [
          {
            label: "Overview",
            href: "/docs",
          },
          {
            label: "Installation",
            href: "/docs/install",
            active: true,
          },
          {
            label: "Project structure",
            href: "/docs/structure",
          },
        ],
      },
      {
        label: "Components",
        icon: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
        badge: "New",
        children: [
          {
            label: "Button",
            href: "/docs/button",
          },
          {
            label: "Input",
            href: "/docs/input",
          },
          {
            label: "Modal",
            href: "/docs/modal",
          },
          {
            label: "Sidebar",
            href: "/docs/sidebar",
          },
        ],
        open: true,
      },
      {
        label: "API",
        icon: "m8 8-4 4 4 4m8-8 4 4-4 4M14 4l-4 16",
        children: [
          {
            label: "REST",
            href: "/docs/rest",
          },
          {
            label: "Webhooks",
            href: "/docs/webhooks",
          },
          {
            label: "GraphQL",
            href: "/docs/graphql",
            disabled: true,
          },
        ],
      },
    ],
  },
];

export default function SidebarNestedExample() {
  return (
    <Sidebar
      sections={sections}
      breakpoint="sm"
      className="h-[540px] rounded-xl border border-line"
      header={
        <>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-ink">
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19V5a2 2 0 0 1 2-2h14v14H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h14" />
            </svg>
          </div>
          <span className="font-semibold text-ink">Handbook</span>
        </>
      }
      footer={undefined}
    >
      <div className="flex-1 p-4">
        <div className="h-full rounded-lg border border-dashed border-line"></div>
      </div>
    </Sidebar>
  );
}
