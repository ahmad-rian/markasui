import { Footer } from "../../components/footer/Footer";

const columns = [
  {
    title: "Components",
    links: [
      {
        label: "Button",
        href: "/components/button",
      },
      {
        label: "Data table",
        href: "/components/data-table",
      },
      {
        label: "Command",
        href: "/components/command",
      },
      {
        label: "Modal",
        href: "/components/modal",
      },
      {
        label: "Toast",
        href: "/components/toast",
      },
      {
        label: "All components",
        href: "/components",
      },
    ],
  },
  {
    title: "Templates",
    links: [
      {
        label: "Landing page",
        href: "/templates/landing",
      },
      {
        label: "Dashboard",
        href: "/templates/dashboard",
      },
      {
        label: "Pricing page",
        href: "/templates/pricing",
      },
      {
        label: "Docs site",
        href: "/templates/docs",
      },
    ],
  },
  {
    title: "Frameworks",
    links: [
      {
        label: "Blade",
        href: "/docs/blade",
      },
      {
        label: "React",
        href: "/docs/react",
      },
      {
        label: "Vue",
        href: "/docs/vue",
      },
      {
        label: "Alpine.js",
        href: "/docs/alpine",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Docs",
        href: "/docs",
      },
      {
        label: "Changelog",
        href: "/changelog",
      },
      {
        label: "MCP server",
        href: "/docs/mcp",
      },
      {
        label: "Registry",
        href: "/docs/registry",
      },
      {
        label: "Status",
        href: "/status",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Careers",
        href: "/careers",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/markasui",
      },
      {
        label: "Discord",
        href: "https://discord.gg/markasui",
      },
      {
        label: "X",
        href: "https://x.com/markasui",
      },
      {
        label: "Showcase",
        href: "/showcase",
      },
    ],
  },
];

const legal = [
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
  {
    label: "License",
    href: "/license",
  },
];

export default function FooterSitemapExample() {
  return (
    <Footer
      className="@3xl:[&>div:first-child]:grid-cols-1"
      copyright="© 2026 MarkasUI"
      description="Open source UI components for Blade, React, and Vue, styled with Tailwind CSS."
      columns={columns}
      legal={legal}
      brand={
        <>
          <svg
            className="size-7 shrink-0"
            viewBox="0 0 1464 1430"
            aria-hidden="true"
          >
            <polygon
              className="fill-ink/15"
              points="354,578 1256,138 1171,430 268,868"
            />
            <polygon
              className="fill-ink/50"
              points="553,443 1455,3 1370,295 467,733"
            />
            <polygon
              className="fill-success/30"
              points="421,762 1325,318 1240,611 336,1050"
            />
            <polygon
              className="fill-ink/25"
              points="265,1073 1169,629 1084,922 180,1362"
            />
            <polygon
              className="fill-ink/75"
              points="93,965 997,521 912,814 8,1253"
            />
            <polygon
              className="fill-success"
              points="347,1135 1251,691 1166,984 262,1424"
            />
          </svg>
          MarkasUI
        </>
      }
      actions={
        <>
          <a
            href="/status"
            className="inline-flex h-7 items-center gap-2 rounded-full border border-line bg-surface px-3 text-xs font-medium text-ink transition-colors duration-150 ease-out hover:border-primary-line"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:animate-none"></span>
              <span className="relative size-2 rounded-full bg-success"></span>
            </span>
            All systems normal
          </a>
          <div className="flex items-center gap-2">
            <label className="relative flex items-center">
              <span className="sr-only">Language</span>
              <select className="h-8 cursor-pointer appearance-none rounded-full border border-line bg-canvas pr-8 pl-3 text-xs font-medium text-ink transition-colors duration-150 ease-out hover:border-primary-line">
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 size-3.5 text-muted"
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
            </label>
            <fieldset className="flex items-center gap-0.5 rounded-full border border-line bg-canvas p-0.5">
              <legend className="sr-only">Theme</legend>
              <label className="flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-out hover:text-ink has-checked:bg-subtle has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary">
                <input
                  type="radio"
                  name="footer-theme"
                  value="system"
                  className="sr-only"
                  defaultChecked
                />
                <svg
                  className="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 5h16v11H4zM8 20h8M12 16v4" />
                </svg>
                <span className="sr-only">System</span>
              </label>
              <label className="flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-out hover:text-ink has-checked:bg-subtle has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary">
                <input
                  type="radio"
                  name="footer-theme"
                  value="light"
                  className="sr-only"
                />
                <svg
                  className="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
                <span className="sr-only">Light</span>
              </label>
              <label className="flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-out hover:text-ink has-checked:bg-subtle has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-primary">
                <input
                  type="radio"
                  name="footer-theme"
                  value="dark"
                  className="sr-only"
                />
                <svg
                  className="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
                </svg>
                <span className="sr-only">Dark</span>
              </label>
            </fieldset>
          </div>
        </>
      }
    />
  );
}
