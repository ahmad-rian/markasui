import { Component } from "@angular/core";
import { Footer } from "../../components/footer/footer.component";

const columns = [
  {
    title: "Product",
    links: [
      {
        label: "Components",
        href: "/components",
      },
      {
        label: "Templates",
        href: "/templates",
      },
      {
        label: "Themes",
        href: "/themes",
      },
      {
        label: "Pricing",
        href: "/pricing",
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
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/markasui",
    icon: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4M9 18c-4.51 2-5-2-7-2",
  },
  {
    label: "X",
    href: "https://x.com/markasui",
    icon: "M4 4l11.7 16H20L8.3 4H4zM4 20l6.8-6.8M13.2 10.8 20 4",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/markasui",
    icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@markasui",
    icon: "M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17M10 15l5-3-5-3z",
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

@Component({
  selector: "markas-example",
  imports: [Footer],
  template: `
    <footer
      markas-footer
      copyright="© 2026 MarkasUI"
      description="Open source UI components for Blade, React, and Vue, styled with Tailwind CSS."
      backToTop
      [columns]="columns"
      [socials]="socials"
      [legal]="legal"
    >
      <ng-container brand
        ><svg
          class="size-7 shrink-0"
          viewBox="0 0 1464 1430"
          aria-hidden="true"
        >
          <polygon
            class="fill-ink/15"
            points="354,578 1256,138 1171,430 268,868"
          />
          <polygon
            class="fill-ink/50"
            points="553,443 1455,3 1370,295 467,733"
          />
          <polygon
            class="fill-success/30"
            points="421,762 1325,318 1240,611 336,1050"
          />
          <polygon
            class="fill-ink/25"
            points="265,1073 1169,629 1084,922 180,1362"
          />
          <polygon class="fill-ink/75" points="93,965 997,521 912,814 8,1253" />
          <polygon
            class="fill-success"
            points="347,1135 1251,691 1166,984 262,1424"
          /></svg
        >MarkasUI</ng-container
      ><ng-container actions
        ><a
          href="/status"
          class="inline-flex h-7 items-center gap-2 rounded-full border border-line bg-surface px-3 text-xs font-medium text-ink transition-colors duration-150 ease-out hover:border-primary-line"
          ><span class="relative flex size-2"
            ><span
              class="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:animate-none"
            ></span
            ><span class="relative size-2 rounded-full bg-success"></span></span
          >All systems normal</a
        ></ng-container
      >
    </footer>
  `,
})
export default class FooterExample {
  protected readonly columns = columns;
  protected readonly socials = socials;
  protected readonly legal = legal;
}
