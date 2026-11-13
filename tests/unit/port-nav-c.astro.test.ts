// @vitest-environment node
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, it } from "vitest";
import Menubar from "../../components/menubar/Menubar.astro";
import NavigationMenu from "../../components/navigation-menu/NavigationMenu.astro";

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const items = [
  {
    label: "Products",
    featured: {
      title: "Workflows 2.0",
      href: "/workflows",
      description: "Visual editor",
    },
    links: [
      {
        label: "Analytics",
        href: "/analytics",
        description: "See where visitors come from",
        icon: "M3 3v18h18",
      },
      { label: "Automation", href: "javascript:alert(1)" },
    ],
  },
  { label: "Developers", links: [{ label: "Docs", href: "/docs" }] },
  { label: "Pricing", href: "/pricing", active: true },
];

describe("Astro NavigationMenu", () => {
  it("renders a labelled nav with disclosure triggers, panels, and the user class", async () => {
    const html = await container.renderToString(NavigationMenu, {
      props: { items, id: "site", class: "mt-4", "data-testid": "nav" },
    });
    expect(html).toContain("<markas-navigation-menu");
    expect(html).toMatch(/<nav[^>]*id="site"/);
    expect(html).toMatch(/<nav[^>]*aria-label="Main"/);
    expect(html).toMatch(/<nav[^>]*data-testid="nav"/);
    expect(html).toMatch(/<nav[^>]*class="[^"]*overflow-x-auto[^"]*mt-4"/);
    expect(html).toContain('popovertarget="site-panel-0"');
    expect(html).toContain('aria-controls="site-panel-1"');
    expect(html).toMatch(/<div id="site-panel-0" popover="auto"/);
    expect(html.match(/aria-expanded="false"/g)).toHaveLength(2);
    expect(html).toMatch(/id="site-panel-0"[^>]*sm:grid-cols-\[13rem_1fr\]/);
    expect(html).not.toMatch(/id="site-panel-1"[^>]*sm:grid-cols/);
    expect(html).toContain('<path d="M3 3v18h18"');
    expect(html).toContain('href="/workflows"');
    expect(html).toMatch(/href="\/pricing" aria-current="page"/);
    expect(html).not.toContain("javascript:");
    expect(html).toContain('data-state="hidden" hidden');
  });

  it("translates the nav label and generates an id when none is given", async () => {
    const html = await container.renderToString(NavigationMenu, {
      props: { items, navLabel: "Utama" },
    });
    expect(html).toContain('aria-label="Utama"');
    const id = html.match(/<nav[^>]*id="(markas-navigation-menu-[\w-]+)"/)![1];
    expect(html).toContain(`aria-controls="${id}-panel-0"`);
  });
});

describe("Astro Menubar", () => {
  const menus = [
    {
      label: "File",
      items: [
        { label: "New file", value: "new" },
        { label: "Save" },
        { separator: true as const },
        { label: "Delete", value: "delete", danger: true },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Docs", href: "javascript:alert(1)" },
        { label: "Redo", disabled: true },
      ],
    },
  ];

  it("renders the bar, roving tabindex, linked menus, and item values", async () => {
    const html = await container.renderToString(Menubar, {
      props: { menus, id: "app", class: "ml-2", label: "Menu aplikasi" },
    });
    expect(html).toContain("<markas-menubar");
    expect(html).toMatch(/<div[^>]*id="app"[^>]*role="menubar"/);
    expect(html).toContain('aria-label="Menu aplikasi"');
    expect(html).toMatch(/role="menubar"[^>]*class="[^"]*p-1 ml-2"/);
    expect(html).toMatch(/id="app-trigger-0"[^>]*tabindex="0"/);
    expect(html).toMatch(/id="app-trigger-1"[^>]*tabindex="-1"/);
    expect(html).toContain('popovertarget="app-menu-1"');
    expect(html).toContain('aria-labelledby="app-trigger-0"');
    expect(html).toContain('data-value="new"');
    expect(html).toContain('data-value="Save"');
    expect(html).toContain('role="separator"');
    expect(html).toMatch(/data-value="delete"[^>]*class="[^"]*text-danger/);
    expect(html).not.toContain("javascript:");
    expect(html).toMatch(/<button[^>]*disabled[^>]*data-value="Redo"/);
  });

  it("uses the default label and a generated id", async () => {
    const html = await container.renderToString(Menubar, { props: { menus } });
    expect(html).toContain('aria-label="Menu"');
    const id = html.match(/id="(markas-menubar-[\w-]+)"/)![1];
    expect(html).toContain(`aria-controls="${id}-menu-0"`);
  });
});
